import * as mongoose from 'mongoose';

export interface Feedback extends mongoose.Document {
    user: string,
    message: string
}

const userSchema = new mongoose.Schema({
    user: {
        type: String
    },
    message: {
        type: String
    }
});

export const Feedback = mongoose.model<Feedback>('Feedback', userSchema);
