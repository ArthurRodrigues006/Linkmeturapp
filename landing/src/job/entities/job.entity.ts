import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { JobPhotos } from './job_photos.entity';
import { Corporation } from 'src/corporations/entities/corporation.entity';
import { JobEvaluation } from './job_evaluation.entity';

@Entity('job')
export class Job extends BaseEntity {
  @Column({ type: 'uuid' })
  corp_id= '';

  @ManyToOne(() => Corporation, (corporation) => corporation.jobs)
  corporation!: Corporation;

  @Column({ type: 'varchar', length: 255 })
  nome_servico= '';

  @Column({ type: 'varchar', length: 100 })
  categoria= '';

  @Column({ type: 'varchar', length: 100, nullable: true })
  sub_categoria= '';

  @Column({ type: 'text' })
  descricao= '';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  min_valor= 0;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  max_valor= 0;

  @Column({ type: 'integer', default: 0 })
  views= 0;

  @Column({ type: 'integer', default: 0 })
  total_views= 0;

  @Column({ type: 'text', nullable: true })
  video_url= '';

  @Column({ type: 'text', array: true, default: [] })
  certificacoes= [];

  @Column({ type: 'text', array: true, default: [] })
  disponibilidade= [];

  @Column({ type: 'boolean', default: false })
  publicado= false;

  @OneToMany(() => JobPhotos, (photos) => photos.job)
  fotos= [];

  @OneToMany(() => JobEvaluation, (evaluation) => evaluation.job)
  avaliacoes= [];
}
