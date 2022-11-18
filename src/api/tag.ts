import request from '@/utils/axios'
import {ListBillDto, ListTagBo} from '#/api'

export function fetchTagList(data?: ListBillDto) {
  return request.post<ListTagBo>('/tag/list', data)
}
