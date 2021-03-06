import { Document, Model } from 'mongoose';

export interface IDataAccess {
  _model: Model<Document, any>;
  _options: any;
  getOne: (filter?: any) => any;
  getOneById: (id: string) => any;
  getMany: (filter?: unknown) => any;
  createOne: (data: unknown, creator?: unknown) => any;
  updateOne: (id: string, data: unknown) => any;
  removeOne: (id: string) => any;
}

class DataAccess implements IDataAccess {
  _model: Model<Document, any>;
  
  _options: any;
  
  constructor(model, options) {
    this._model = model;
    this._options = options;
  }

  async getOne(filter) {
    return this._model.findOne(filter).lean(this._options).exec();
  }
  
  async getOneById(id) {
    return this._model.findById(id).lean(this._options).exec();
  }

  async getMany(filter) {
    return this._model.find(filter).lean(this._options).exec();
  }

  async createOne(data, creator) {
    let savedData = {...data}
    if (creator) {
      savedData.created_by = creator;
      savedData.updated_by = creator;
    }
    return this._model.create(savedData);
  }

  async updateOne(id, updatedData) {
    const updateOptions = { new: true, runValidators: true }
    return this._model.findByIdAndUpdate(id, updatedData, updateOptions).lean(this._options).exec()
  }

  async removeOne(id) {
    const data = { _id: id }
    return this._model.findOneAndRemove(data);
  }

}

export default DataAccess;