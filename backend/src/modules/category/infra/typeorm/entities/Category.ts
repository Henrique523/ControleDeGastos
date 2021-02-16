import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm'
import { Exclude } from 'class-transformer'
import Cost from './Cost'

@Entity('categories')
export default class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  description: string

  @OneToMany(() => Cost, cost => cost.category_id)
  @JoinColumn({ name: 'category_id' })
  category: Category

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
