export interface Bill {
  id: string
  type: number
  amount: string
  tag_id: string
  tag_name: string
  user_id: string
  remark: string
  date: string
  created_time: string
  updated_time: string
}
export interface OneDayBills {
  date: string
  bills: Bill[]
}
