import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { SEARCH_QUERY } from '../query/search';
import ReactLoading from "react-loading";
import { UserInterface } from '../components/Profile/UserInterface';
import { PostInterface } from '../components/Home/PostInterface';
import { MemoizedPost } from '../components/Home/Post';

const OPTION = {
  USER: "user",
  POST: "post",
  ALL: "all"
}

export default function Search() {
  const { input } = useParams()
  const { loading, data, error, refetch } = useQuery(SEARCH_QUERY, {
    variables: { query: input },
  });
  const DELAY = 2000;
  const LIMIT = 3;
  const [type, setType] = useState<string>(OPTION.ALL)
  const [fakeLoadPeople, setfakeLoadPeople] = useState<boolean>(false)
  const [fakeLoadPost, setfakeLoadPost] = useState<boolean>(false)
  const [limitPeople, setlimitPeople] = useState<number>(LIMIT)
  const [limitPost, setlimitPost] = useState<number>(LIMIT)

  function handleLoadMore(opt: string) {
    switch (opt) {
      case OPTION.POST: {
        setfakeLoadPost(true);
        setTimeout(() => {
          setfakeLoadPost(false)
          setlimitPost(prev => prev + LIMIT)
        }, DELAY)
        break
      }
      case OPTION.USER: {
        setfakeLoadPeople(true);
        setTimeout(() => {
          setfakeLoadPeople(false)
          setlimitPeople(prev => prev + LIMIT)
        }, DELAY)
        break
      }
    }
  }

  function handleConnect() {

  }

  if (loading) {
    return (
      <ReactLoading
        type="balls"
        color="gray"
        height={"10%"}
        width={"10%"}
      ></ReactLoading>
    )
  }

  if (error) {
    console.log(error)
    return <div></div>
  }

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex flex-row'>
        <div className='btn-plain bg-base-300 py-2' onClick={() => { setType(OPTION.POST) }}>
          <div className='bg'></div>
          <div className='text-sm font-bold'>posts</div>
        </div>
        <div className='w-4'></div>
        <div className='btn-plain bg-base-300 py-2' onClick={() => { setType(OPTION.USER) }}>
          <div className='bg'></div>
          <div className='text-sm font-bold'>people</div>
        </div>
        <div className='w-4'></div>
        <div className='btn-plain bg-base-300 py-2' onClick={() => { setType(OPTION.ALL) }}>
          <div className='bg'></div>
          <div className='text-sm font-bold'>all</div>
        </div>
      </div>
      <div className='h-4'></div>
      {
        (type === OPTION.ALL || type === OPTION.USER) &&
        <div className='box mb-2'>
          <div className='text-md font-bold'>People</div>
          <div className='h-2'></div>
          {data.search.user.map((u: UserInterface, idx: number) => {
            if (idx < limitPeople)
              return (
                <React.Fragment>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                      <div className="inv-avatar">
                        <img src={u.PhotoProfile} className="inv-avatar-image" />
                      </div>
                      <div className="w-4"></div>
                      <div className="flex flex-col">
                        <div className="text-md font-semibold">{u.name}</div>
                        <div className="text-sm font-medium">{u.email}</div>
                      </div>
                    </div>
                    <div className="flex flex-row py-4">
                      <div className="btn-primary" onClick={handleConnect}>
                        <div className="bg"></div>
                        <div className="py-2">Connect</div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )
          })}
          {fakeLoadPeople ?
            (data.search.user.length >= limitPeople) &&
            <div className='w-full center-all'>
              <ReactLoading
                type="balls"
                color="gray"
                height={"10%"}
                width={"10%"}
              ></ReactLoading>
            </div>
            :
            <div className='btn-plain bg-base-300 py-2' onClick={() => { handleLoadMore(OPTION.USER) }}>
              <div className='bg'></div>
              <div className='text-sm font-bold'>Load more</div>
            </div>
          }
        </div>
      }
      {
        (type === OPTION.ALL || type === OPTION.POST) &&
        <div className='box'>
          <div className='text-md font-bold'>Post</div>
          {data.search.post.map((ps: PostInterface, idx: number) => {
            if (idx < limitPost)
              return (
                <React.Fragment>
                  <MemoizedPost ps={ps} />
                  {idx < data.search.post.length - 1 && <div className='h-2'></div>}
                </React.Fragment>
              )
          })}
          {fakeLoadPost ?
            (data.search.post.length >= limitPost) &&
            <div className='w-full center-all'>
              <ReactLoading
                type="balls"
                color="gray"
                height={"10%"}
                width={"10%"}
              ></ReactLoading>
            </div>
            :
            <div className='btn-plain bg-base-300 py-2' onClick={() => { handleLoadMore(OPTION.POST) }}>
              <div className='bg'></div>
              <div className='text-sm font-bold'>Load more</div>
            </div>
          }
        </div>
      }
    </div>
  )
}
