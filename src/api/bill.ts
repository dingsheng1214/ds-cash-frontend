import request from '@/utils/axios'
import {ListBillDto, ListBillBo, CreateBillDto} from '#/api'

export function fetchBillList(data: ListBillDto) {
  return request.post<ListBillBo>('/bill/list', data)
}

export function createBill(data: CreateBillDto) {
  return request.post('/bill/create', data)
}

export function deleteBill(id: string) {
  return request.delete(`/bill/${id}`)
}
