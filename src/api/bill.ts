import request from '@/utils/axios'
import {
  ListBillDto,
  ListBillBo,
  CreateBillDto,
  UpdateBillDto,
  MakeupBillDto,
  MakeupBillBo,
} from '#/api'
import {Bill} from '#/global'

export function fetchBillList(data: ListBillDto) {
  return request.post<ListBillBo>('/bill/list', data)
}

export function createBill(data: CreateBillDto) {
  return request.post('/bill/create', data)
}

export function deleteBill(id: string) {
  return request.delete(`/bill/${id}`)
}

export function getBill(id: string) {
  return request.get<Bill>(`/bill/${id}`)
}

export function updateBill(data: UpdateBillDto) {
  return request.post('/bill/update', data)
}

export function makeupBill(data: MakeupBillDto) {
  return request.post<MakeupBillBo[]>('/bill/makeup', data)
}
