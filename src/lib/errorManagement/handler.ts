import { Logger } from '../logger';
import operationalErrorDecider from './operationalErrorDecider';


function registerErrorHandler(err, res) {
		init()

		Logger.error('Hello again distributed logs');
    Logger.info(`Exception was caught by express middleware`);
		logAndNotifyAboutError(err);
    res.status(err.httpCode).json(getFriendlyResponse(err));
			//since this error comes from an http request, we keep the process alive by taking a risky call that the error is probably operational
};

function init() {
		Logger.debug(`Error handler now registers to handle all errors`);
		process.on('uncaughtException', (error) => {
      Logger.info(`Uncaught exception was caught with the following error ${error.name}: ${error.message}`);
			logAndNotifyAboutError(error);
			crashIfNotOperational(error);
		});

		process.on('unhandledRejection', (reason, p) => {
			Logger.info(`Unhandled rejection was caught for the following promise ${p}`);
			logAndNotifyAboutError(reason);
			crashIfNotOperational(reason);
		});
};


	function crashIfNotOperational(error){
    if (!operationalErrorDecider(error)) {
			Logger.info(`Error handler concluded that this error is not trusted thus exiting`);
			process.exit(1);
		}
	};

  	function logAndNotifyAboutError (error) {
		if (!operationalErrorDecider(error))
      Logger.info("A non-trusted (not operational) error was detect, this will likely to kill the process - please analyze this issue and act thoughtfully");

    Logger.error(`Error handler is reporting a new error: ${error}`);
	};


	function getFriendlyResponse(error) {
    return { name: error.name, message: error.message }; //||error.message if comes as status code
	};

export default registerErrorHandler;