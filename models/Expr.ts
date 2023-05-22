import { z } from 'zod'

export const ExprSchema = z.object({
  text: z.string(),
})

export type Expr = z.infer<typeof ExprSchema>

export function getExprUid(expr: Expr) {
  return JSON.stringify([expr.text])
}
