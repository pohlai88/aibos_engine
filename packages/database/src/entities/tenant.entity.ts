// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TenantStatus, TenantType } from '@aibos/types';

// @Entity('tenants')
export class Tenant {
  // @PrimaryGeneratedColumn('uuid')
  id!: string;

  // @Column({ unique: true })
  name!: string;

  // @Column({ unique: true })
  slug!: string;

  // @Column({ nullable: true })
  description!: string;

  // @Column({
  //   type: 'enum',
  //   enum: TenantStatus,
  //   default: TenantStatus.PENDING
  // })
  status!: TenantStatus;

  // @Column({
  //   type: 'enum',
  //   enum: TenantType,
  //   default: TenantType.INDIVIDUAL
  // })
  type!: TenantType;

  // @Column({ type: 'jsonb' })
  config!: Record<string, any>;

  // @Column({ type: 'jsonb' })
  limits!: Record<string, any>;

  // @Column({ type: 'jsonb' })
  usage!: Record<string, any>;

  // @Column({ nullable: true })
  customDomain!: string;

  // @Column({ default: 'UTC' })
  timezone!: string;

  // @Column({ default: 'en' })
  locale!: string;

  // @Column({ type: 'jsonb', default: [] })
  features!: string[];

  // @Column({ type: 'jsonb', default: [] })
  installedModules!: string[];

  // @Column({ type: 'jsonb', default: {} })
  metadata!: Record<string, any>;

  // @CreateDateColumn()
  createdAt!: Date;

  // @UpdateDateColumn()
  updatedAt!: Date;
} 