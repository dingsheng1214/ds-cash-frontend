import {OneDayBills} from './global'

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
  user_id: string
  date: string
  pageInfo: pageInfo
}

export interface ListBillBo {
  total_expense: number
  total_income: number
  total_page: number
  list: OneDayBills[]
}
