interface Repository<T> {
  getAll(): T[]
  getById(id: string): T | undefined
  create(item: T): void
  update(id: string, item: T): void
  delete(id: string): void
}