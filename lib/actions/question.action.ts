'use server'

import { connectToDatabase } from '../mongoose'

export async function createQuestion(params: any) {
  try {
    connectToDatabase()
    console.log('\n\n\n', params, '\n\n\n')
  } catch (error) {
    console.log(error)
    throw error
  }
}
