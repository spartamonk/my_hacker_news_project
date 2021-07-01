import React from 'react'

import { useGlobalContext } from './context'

const Stories = () => {
  const { isLoading, hits, removeStory} = useGlobalContext()
  
  if(isLoading) {
    return <div className="loading"></div>
  }
  return (
    <section className="stories">
      {
        hits.map(story=> {
          const {objectID:id, title,url,author,num_comments:comments, points} = story
          return (
            <article key={id} className='story'>
              <h4 className='title'>{title}</h4>
              <p className='info'>
                {points} points by
                <span> {author} | </span>
                {comments} comments
              </p>
              <div>
                <a
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='read-link'
                >
                  read more
                </a>
                <button className='remove-btn'onClick={()=> removeStory(id)} >
                  remove
                </button>
              </div>
            </article>
          )
        })
      }
  </section>
  )
}

export default Stories
