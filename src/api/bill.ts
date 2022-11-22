import request from '@/utils/axios'
import {
  ListBillDto,
  ListBillBo,
  CreateBillDto,
  UpdateBillDto,
  MakeupBillDto,
  MakeupBillBo,
  RankBillDto,
  RankBillBo,
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

export function rankBill(data: RankBillDto) {
  return request.post<RankBillBo>('/bill/rank', data)
}

export function dailyCompare(data: MakeupBillDto) {
  return request.post<{date: string; total: number}[]>(
    '/bill/dailyCompare',
    data
  )
}
