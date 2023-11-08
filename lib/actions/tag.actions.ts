'use server'

import { Question, Tag, User } from '@/database'
import type { ITag } from '@/database/tag.model'

import type {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams
} from './shared'

import { connectToDatabase } from '../mongoose'
import { FilterQuery } from 'mongoose'

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase()
    const { userId } = params
    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    return [
      { _id: '1', name: 'Next js' },
      { _id: '2', name: 'React js' }
    ]
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getAllTags(params?: GetAllTagsParams) {
  try {
    connectToDatabase()

    const tags = await Tag.find({})
    return { tags }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase()

    const { tagId, page = 1, pageSize = 10, searchQuery } = params

    const tagFilter: FilterQuery<ITag> = { _id: tagId }

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery ? { title: { $regex: searchQuery, $options: 'i' } } : {},
      options: { sort: { createdAt: -1 } },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' }
      ]
    })

    if (!tag) {
      throw new Error('Tag not found')
    }

    const questions = tag.questions

    return { tagTitle: tag.name, questions }
  } catch (error) {
    console.log(error)
    throw error
  }
}
