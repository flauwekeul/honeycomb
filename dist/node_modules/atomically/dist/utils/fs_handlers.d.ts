import { Exception } from '../types';
declare const Handlers: {
    isChangeErrorOk: (error: Exception) => boolean;
    isRetriableError: (error: Exception) => boolean;
    onChangeError: (error: Exception) => void;
};
export default Handlers;
