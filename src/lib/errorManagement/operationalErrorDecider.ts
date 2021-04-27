
// const logger = morgan('dev')

export default operationalErrorDecider;

//this object is responsible to run various rules on an error object and decide whether it's familiar and probably operational
//many packages throw non-classified errors though it's hard to determine whether the error is safe/operational - this place allow to run those decision rules
function operationalErrorDecider(error): boolean {
  return isOperationalError(error);
}

function isOperationalError(error): boolean {
  const rules = getAllRules(error);
  return rules.some((rule) => rule);
}


function getAllRules(error): boolean[] {
  if (!error) return [];
  
  const allRules: boolean[] = [];
  //if isOperational is stated explictly - then its obvious
  if (error.isOperational) allRules.push(true);
  //probably coming from some middleware that serves a single request
  if (!isNaN(error.httpCode)) allRules.push(true);
  // TODO:
  // mongoose driver
  return allRules;
};