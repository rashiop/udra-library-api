import { Document, model, Schema } from 'mongoose';

interface IGenre {
  name: string
}

interface IGenreDoc extends IGenre, Document {}

const genreSchemaField: Record<keyof IGenre, any> = {
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    minLength: 4
  }
}

const genreSchema = new Schema(genreSchemaField,
  { timestamps: true }
)

genreSchema.index({ name: 1 }, { unique: true })

export const Genre = model<IGenreDoc>('Genre', genreSchema)