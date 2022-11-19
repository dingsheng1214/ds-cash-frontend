import request from '@/utils/axios'
import {ListBillDto, ListTagBo, Tag} from '#/api'

export function fetchTagList(data?: ListBillDto) {
  return request.post<ListTagBo>('/tag/list', data)
}
export function getTag(id: string) {
  return request.get<Tag>(`/tag/${id}`)
}
