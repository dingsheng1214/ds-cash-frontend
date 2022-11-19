import {Tag} from '#/api'
import {fetchTagList} from '@/api/tag'
import {useEffect, useState} from 'react'

export default function useTag(fetch: boolean = false) {
  const [expense, setExpense] = useState<Tag[]>([]) // 支出类型标签
  const [income, setIncome] = useState<Tag[]>([]) // 收入类型标签

  useEffect(() => {
    ;(async () => {
      if (fetch) {
        const {data} = await fetchTagList()
        setExpense(data.filter((i) => i.type === 1))
        setIncome(data.filter((i) => i.type === 2))
      }
    })()
  }, [fetch])

  return {
    expense,
    income,
  }
}
