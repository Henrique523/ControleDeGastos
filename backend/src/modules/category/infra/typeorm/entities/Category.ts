import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity('categories')
export default class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  description: string

  @CreateDateColumn()
  @Exclude()
  created_at: Date

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date

  @DeleteDateColumn()
  @Exclude()
  deleted_at: Date | null
}
