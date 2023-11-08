import React from 'react'
import Link from 'next/link'
import RenderTag from '@/components/shared/RenderTag'
import Metric from '@/components/shared//Metric'
import { getTimeStamp, formatAndDivideNumber } from '@/lib/utils'

interface QuestionProps {
  id: string
  title: string
  tags: {
    id: string
    name: string
  }[]
  author: {
    id: string
    name: string
    picture: string
  }
  upvotes: string[]
  views: number
  answers: Array<object>
  createdAt: Date
}

const QuestionsCard = ({
  id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt
}: QuestionProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag.id} id={tag.id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt={author.name}
          value={author.name}
          title={` - asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author.id}`}
          isAuthor
          textStyles="body-medium text-dark400_light800"
        />

        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvote"
          value={formatAndDivideNumber(upvotes.length)}
          title="Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={answers.length}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  )
}

export default QuestionsCard
