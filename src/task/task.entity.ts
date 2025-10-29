// Task Entity -> Maps to Database Table

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export type TaskStatus = 'pending' | 'in_progress' | 'done'

@Entity({name: 'tasks'})
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    title: string;

    @Column({type: 'text', nullable: true})
    description: string;
    
    @Column({ type: 'enum', enum: ['pending', 'in_progress', 'done'], default: 'pending' }) 
    status: TaskStatus;

    @CreateDateColumn({type: 'timestamptz', name: 'created_at'})
    created_at: Date;

    @Column({ type: 'timestamptz', name: 'completed_at', nullable: true})
    completed_at?: Date | null;
}