import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import Category from '@modules/category/infra/typeorm/entities/Category'

@Entity('costs')
export default class Cost {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('timestamp with time zone')
  date: Date

  @Column()
  description: string

  @Column()
  value: number

  @Column()
  category_id: number

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
