import {Bill, OneDayBills} from './global'

export interface LoginDto {
  username: string
  password: string
}

export interface SignupDto {
  username: string
  password: string
}

export interface pageInfo {
  page: number
  page_size: number
}
export interface ListBillDto {
  type?: 1 | 2
  tag_id?: string
  date: string
  pageInfo: pageInfo
}

export interface ListBillBo {
  total_expense: number
  total_income: number
  total_page: number
  list: OneDayBills[]
}

export interface Tag {
  id: string
  type?: 1 | 2
  name?: string
  user_id?: string
  icon?: string | undefined
}
export interface ListTagDto {
  type?: 1 | 2
}
export type ListTagBo = Tag[]

export interface CreateBillDto {
  type: 1 | 2
  amount: number
  tag_id: string
  date: string
  remark?: string
}

export type UpdateBillDto = {id: string} & CreateBillDto

export type MakeupBillDto = {
  type: 1 | 2
  date: string
}
export type MakeupBillBo = {
  tag_id: string
  tag_name: string
  tag_icon: string
  total: number
}

export interface RankBillDto {
  type: 1 | 2
  tag_id?: string
  orderBy: 'amount' | 'date'
  date: string
  pageInfo: pageInfo
}
export interface RankBillBo {
  total_amount: number
  total_page: number
  list: Bill[]
}
