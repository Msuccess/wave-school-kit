import { extname } from 'path';

export const imageFileFilter = (
  _req: any,
  file: { originalname: string },
  callback: (arg0: Error, arg1: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (
  _req: any,
  file: { originalname: string },
  callback: (arg0: any, arg1: string) => void,
) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = `${new Date().toDateString()}-${new Date().getTime()}`;
  callback(null, `${name}-${randomName.trim()}${fileExtName}`);
};
