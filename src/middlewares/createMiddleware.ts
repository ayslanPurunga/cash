import { Request, Response, NextFunction } from "express"

export const createMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body
  const create = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  const validPass = create.test(password)
  const THREE = 3
  if (username.length < THREE) res.status(403).json({ message: 'Username must have at least 3 characters'})
  if (!validPass) {
    return res.status(403).json({ message: 'Password must have at least 8 char, 1 upper and 1 number'})
  }
  next()
}