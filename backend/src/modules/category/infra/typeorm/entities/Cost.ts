import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import Category from '@modules/category/infra/typeorm/entities/Category'
import { Exclude } from 'class-transformer'

@Entity('costs')
export default class Cost {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('timestamp with time zone')
  date: Date

  @Column()
  description: string

  @Column()
  value: number

  @Column()
  category_id: string

  @ManyToOne(() => Category)
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
