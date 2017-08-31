
module.exports = {

  reqParamsBuilder : function(reqType, attribute, value, req){

    const options = req ? req.options : {}

    return {

      options,
      params : {
        all : function(){

          return {
            where : reqType === 'where' ? {[attribute] : value} : undefined
          }
        }
      },
      allParams : function(){
        return reqType === 'where' ? {[attribute] : value} : undefined
      },
      param : function(){

        if(reqType === 'sort asc'){
          return attribute + ' asc'
        }else if(reqType === 'sort desc'){
          return attribute + ' desc'
        }

        return undefined
      }
    }
  }

}
