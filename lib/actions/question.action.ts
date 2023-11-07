'use server'

import { revalidatePath } from 'next/cache'
import Question from '@/database/question.model'
import Tag from '@/database/tag.model'
import User from '@/database/user.model'

import { connectToDatabase } from '../mongoose'
import type { CreateQuestionParams, GetQuestionsParams } from './shared'

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase()

    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 })

    return { questions }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase()
    const { title, content, tags, author, path } = params

    // 创建问题
    const question = await Question.create({
      title,
      content,
      author
    })

    const tagDocument = []

    // 遍历传入的标签，如果标签不存在则创建标签
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        // 通过正则表达式匹配标签
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        // 如果标签存在则更新标签的问题列表，如果标签不存在则创建标签
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      )
      tagDocument.push(existingTag._id)
    }

    // 按照标签的ID查找并更新
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocument } }
    })

    // 重新验证路径
    revalidatePath(path)
  } catch (error) {
    console.log(error)
  }
}
