import request from '@/utils/axios'
import {ListBillDto, ListBillBo} from '#/api'

export function fetchBillList(data: ListBillDto) {
  return request.post<ListBillBo>('/bill/list', data)
}
