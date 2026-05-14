import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity('appoiments')
export class Appoiment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    id_user: User;

    @CreateDateColumn({nullable: false})
    datetime: Date;

    @Column({nullable: false})
    status: Enumerator;

    @CreateDateColumn()
    created_at: Date;

    @Column({nullable: false})
    id_doctor: string;

    @Column({nullable: false})
    motivo: string;


}