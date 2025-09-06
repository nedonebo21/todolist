export type FieldError = {
   error: string
   field: string
}
export type BaseResponse<T = {}> = {
   url: string | undefined
   data: T
   resultCode: number
   messages: string[]
   fieldsErrors: FieldError[]
}
