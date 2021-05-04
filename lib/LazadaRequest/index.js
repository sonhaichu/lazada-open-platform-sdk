'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Determind if response is successful
 * @param {LazadaOpenPlatformAPIResponse} response
 * @return {boolean} success
 */


var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _constants = require('./constants');

var _signature = require('./signature');

var _Common = require('../types/Common');

var _Request = require('./types/Request');

var _Response = require('./types/Response');

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LazadaOpenPlatformAPIResponse = _flowRuntime2.default.tdz(function () {
  return _Response.LazadaOpenPlatformAPIResponse;
});

var SDKRequestMetaData = _flowRuntime2.default.tdz(function () {
  return _Request.SDKRequestMetaData;
});

var SystemQueryParams = _flowRuntime2.default.tdz(function () {
  return _Request.SystemQueryParams;
});

var KeyValueDictionary = _flowRuntime2.default.tdz(function () {
  return _Common.KeyValueDictionary;
});

var isResponseSuccessful = _flowRuntime2.default.annotate(function isResponseSuccessful(response) {
  var _responseType = _flowRuntime2.default.union(_flowRuntime2.default.ref(LazadaOpenPlatformAPIResponse), _flowRuntime2.default.any());

  var _returnType = _flowRuntime2.default.return(_flowRuntime2.default.boolean());

  _flowRuntime2.default.param('response', _responseType).assert(response);

  return _returnType.assert((typeof response === 'undefined' ? 'undefined' : _typeof(response)) === 'object' && response !== null && response.hasOwnProperty('code') && response.code === _constants.RESPONSE.SUCCESS.CODE);
}, _flowRuntime2.default.function(_flowRuntime2.default.param('response', _flowRuntime2.default.union(_flowRuntime2.default.ref(LazadaOpenPlatformAPIResponse), _flowRuntime2.default.any())), _flowRuntime2.default.return(_flowRuntime2.default.boolean())));

var handleLazadaResponse = _flowRuntime2.default.annotate(function handleLazadaResponse(response, meta) {
  var _responseType2 = _flowRuntime2.default.ref(LazadaOpenPlatformAPIResponse);

  var _metaType = _flowRuntime2.default.ref(SDKRequestMetaData);

  var _returnType2 = _flowRuntime2.default.return(_flowRuntime2.default.ref(LazadaOpenPlatformAPIResponse));

  _flowRuntime2.default.param('response', _responseType2).assert(response);

  _flowRuntime2.default.param('meta', _metaType).assert(meta);

  // for debug only
  var _log_request = _flowRuntime2.default.annotate(function _log_request(_arg, response) {
    var _t$ref$assert = _flowRuntime2.default.ref(SDKRequestMetaData).assert(_arg),
        method = _t$ref$assert.method,
        apiPath = _t$ref$assert.apiPath,
        payload = _t$ref$assert.payload,
        query = _t$ref$assert.query;

    console.info('[%s] '.replace(/%s/, method) + apiPath, ' ', payload, ' ', query);
    console.log(JSON.stringify(response, null, 2));
  }, _flowRuntime2.default.function(_flowRuntime2.default.param('_arg', _flowRuntime2.default.ref(SDKRequestMetaData)), _flowRuntime2.default.param('response', _flowRuntime2.default.any())));
  // _log_request(meta, response)
  if (isResponseSuccessful(response)) {
    return Promise.resolve(response).then(function (_arg2) {
      return _returnType2.assert(_arg2);
    });
  } else {
    return Promise.reject(response).then(function (_arg3) {
      return _returnType2.assert(_arg3);
    });
  }
}, _flowRuntime2.default.function(_flowRuntime2.default.param('response', _flowRuntime2.default.ref(LazadaOpenPlatformAPIResponse)), _flowRuntime2.default.param('meta', _flowRuntime2.default.ref(SDKRequestMetaData)), _flowRuntime2.default.return(_flowRuntime2.default.ref('Promise', _flowRuntime2.default.ref(LazadaOpenPlatformAPIResponse)))));

var get = _flowRuntime2.default.annotate(function get(base, appKey, appSecret, apiPath, accessToken, params) {
  var _baseType = _flowRuntime2.default.string();

  var _appKeyType = _flowRuntime2.default.string();

  var _appSecretType = _flowRuntime2.default.string();

  var _apiPathType = _flowRuntime2.default.string();

  var _accessTokenType = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

  var _paramsType = _flowRuntime2.default.ref(KeyValueDictionary);

  var _returnType3 = _flowRuntime2.default.return(_flowRuntime2.default.ref(LazadaOpenPlatformAPIResponse));

  _flowRuntime2.default.param('base', _baseType).assert(base);

  _flowRuntime2.default.param('appKey', _appKeyType).assert(appKey);

  _flowRuntime2.default.param('appSecret', _appSecretType).assert(appSecret);

  _flowRuntime2.default.param('apiPath', _apiPathType).assert(apiPath);

  _flowRuntime2.default.param('accessToken', _accessTokenType).assert(accessToken);

  _flowRuntime2.default.param('params', _paramsType, true).assert(params);

  var qs = Object.assign({}, params, getSystemQueryParamObject(appKey, appSecret, apiPath, accessToken, params));

  return (0, _requestPromise2.default)({
    url: base + apiPath,
    qs: qs,
    json: true
  }).then(function (response) {
    var meta = {
      method: 'GET',
      apiPath: apiPath,
      payload: params,
      query: qs
    };
    return handleLazadaResponse(response, meta);
  }).then(function (_arg4) {
    return _returnType3.assert(_arg4);
  });
}, _flowRuntime2.default.function(_flowRuntime2.default.param('base', _flowRuntime2.default.string()), _flowRuntime2.default.param('appKey', _flowRuntime2.default.string()), _flowRuntime2.default.param('appSecret', _flowRuntime2.default.string()), _flowRuntime2.default.param('apiPath', _flowRuntime2.default.string()), _flowRuntime2.default.param('accessToken', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.param('params', _flowRuntime2.default.ref(KeyValueDictionary)), _flowRuntime2.default.return(_flowRuntime2.default.ref('Promise', _flowRuntime2.default.ref(LazadaOpenPlatformAPIResponse)))));

var post = _flowRuntime2.default.annotate(function post(base, appKey, appSecret, apiPath, accessToken, body) {
  var _baseType2 = _flowRuntime2.default.string();

  var _appKeyType2 = _flowRuntime2.default.string();

  var _appSecretType2 = _flowRuntime2.default.string();

  var _apiPathType2 = _flowRuntime2.default.string();

  var _accessTokenType2 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

  var _bodyType = _flowRuntime2.default.ref(KeyValueDictionary);

  var _returnType4 = _flowRuntime2.default.return(_flowRuntime2.default.ref(LazadaOpenPlatformAPIResponse));

  _flowRuntime2.default.param('base', _baseType2).assert(base);

  _flowRuntime2.default.param('appKey', _appKeyType2).assert(appKey);

  _flowRuntime2.default.param('appSecret', _appSecretType2).assert(appSecret);

  _flowRuntime2.default.param('apiPath', _apiPathType2).assert(apiPath);

  _flowRuntime2.default.param('accessToken', _accessTokenType2).assert(accessToken);

  _flowRuntime2.default.param('body', _bodyType, true).assert(body);

  // turns out even it's HTTP POST, Lazada expect `body` to be part of query string
  var qs = Object.assign({}, body, getSystemQueryParamObject(appKey, appSecret, apiPath, accessToken, body));
  return (0, _requestPromise2.default)({
    method: 'POST',
    url: base + apiPath,
    form: qs,
    json: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }).then(function (response) {
    var meta = {
      method: 'POST',
      apiPath: apiPath,
      payload: body,
      query: qs
    };
    return handleLazadaResponse(response, meta);
  }).then(function (_arg5) {
    return _returnType4.assert(_arg5);
  });
}, _flowRuntime2.default.function(_flowRuntime2.default.param('base', _flowRuntime2.default.string()), _flowRuntime2.default.param('appKey', _flowRuntime2.default.string()), _flowRuntime2.default.param('appSecret', _flowRuntime2.default.string()), _flowRuntime2.default.param('apiPath', _flowRuntime2.default.string()), _flowRuntime2.default.param('accessToken', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.param('body', _flowRuntime2.default.ref(KeyValueDictionary)), _flowRuntime2.default.return(_flowRuntime2.default.ref('Promise', _flowRuntime2.default.ref(LazadaOpenPlatformAPIResponse)))));

/**
 * Gather system and business parameters to compute signature
 * @param {string} appKey
 * @param {string} appSecret
 * @param {string} apiPath
 * @param {string?} accessToken
 * @param {KeyValueDictionary?} payload
 * @return {SystemQueryParams}
 */
var getSystemQueryParamObject = _flowRuntime2.default.annotate(function getSystemQueryParamObject(appKey, appSecret, apiPath, accessToken, payload) {
  var _appKeyType3 = _flowRuntime2.default.string();

  var _appSecretType3 = _flowRuntime2.default.string();

  var _apiPathType3 = _flowRuntime2.default.string();

  var _accessTokenType3 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

  var _payloadType = _flowRuntime2.default.ref(KeyValueDictionary);

  var _returnType5 = _flowRuntime2.default.return(_flowRuntime2.default.ref(SystemQueryParams));

  _flowRuntime2.default.param('appKey', _appKeyType3).assert(appKey);

  _flowRuntime2.default.param('appSecret', _appSecretType3).assert(appSecret);

  _flowRuntime2.default.param('apiPath', _apiPathType3).assert(apiPath);

  _flowRuntime2.default.param('accessToken', _accessTokenType3).assert(accessToken);

  _flowRuntime2.default.param('payload', _payloadType, true).assert(payload);

  var systemParams = _flowRuntime2.default.object(_flowRuntime2.default.property('app_key', _flowRuntime2.default.string()), _flowRuntime2.default.property('timestamp', _flowRuntime2.default.string()), _flowRuntime2.default.property('sign_method', _flowRuntime2.default.string()), _flowRuntime2.default.property('access_token', _flowRuntime2.default.string(), true)).assert({
    app_key: appKey,
    timestamp: Date.now().toString(),
    sign_method: 'sha256'
  });

  if (accessToken) {
    systemParams.access_token = accessToken;
  }

  return _returnType5.assert(Object.assign({}, {
    sign: (0, _signature.signRequest)(appSecret, apiPath, Object.assign({}, payload, systemParams))
  }, systemParams));
}, _flowRuntime2.default.function(_flowRuntime2.default.param('appKey', _flowRuntime2.default.string()), _flowRuntime2.default.param('appSecret', _flowRuntime2.default.string()), _flowRuntime2.default.param('apiPath', _flowRuntime2.default.string()), _flowRuntime2.default.param('accessToken', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.param('payload', _flowRuntime2.default.ref(KeyValueDictionary)), _flowRuntime2.default.return(_flowRuntime2.default.ref(SystemQueryParams))));

// constructor
module.exports = {
  get: get,
  post: post,
  isResponseSuccessful: isResponseSuccessful,
  // helper
  getSystemQueryParamObject: getSystemQueryParamObject
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYXphZGFSZXF1ZXN0L2luZGV4LmpzIl0sIm5hbWVzIjpbImlzUmVzcG9uc2VTdWNjZXNzZnVsIiwicmVzcG9uc2UiLCJoYXNPd25Qcm9wZXJ0eSIsImNvZGUiLCJSRVNQT05TRSIsIlNVQ0NFU1MiLCJDT0RFIiwiaGFuZGxlTGF6YWRhUmVzcG9uc2UiLCJtZXRhIiwiX2xvZ19yZXF1ZXN0IiwibWV0aG9kIiwiYXBpUGF0aCIsInBheWxvYWQiLCJxdWVyeSIsImNvbnNvbGUiLCJpbmZvIiwicmVwbGFjZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImdldCIsImJhc2UiLCJhcHBLZXkiLCJhcHBTZWNyZXQiLCJhY2Nlc3NUb2tlbiIsInBhcmFtcyIsInFzIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2V0U3lzdGVtUXVlcnlQYXJhbU9iamVjdCIsInVybCIsImpzb24iLCJ0aGVuIiwicG9zdCIsImJvZHkiLCJmb3JtIiwiaGVhZGVycyIsImFwcF9rZXkiLCJ0aW1lc3RhbXAiLCJEYXRlIiwibm93IiwidG9TdHJpbmciLCJzaWduX21ldGhvZCIsInN5c3RlbVBhcmFtcyIsImFjY2Vzc190b2tlbiIsInNpZ24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFDQTs7OztBQVVBOzs7Ozs7O0FBUkE7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsSUFBTUEsc0RBQXVCLDhCQUMzQkMsUUFEMkIsRUFFZjtBQUFBLHNCQURKLDRCQUFFLHdEQUFGLEVBQWtDLDJCQUFsQyxDQUNJOztBQUFBLGlEQUFYLCtCQUFXOztBQUFBOztBQUNaLDRCQUNFLFFBQU9BLFFBQVAseUNBQU9BLFFBQVAsT0FBb0IsUUFBcEIsSUFDQUEsYUFBYSxJQURiLElBRUFBLFNBQVNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FGQSxJQUdBRCxTQUFTRSxJQUFU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SGYsOEJBR2U7O0FBQUEsMEJBRlgsK0JBQUcsOEJBQUgsQ0FFVzs7QUFBQSxxQkFEZCw2Q0FDYzs7QUFBQSxrREFBckIsNENBQXFCOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUN0QixxQkFBa0IsNkJBQ2hCLDBDQUFTLDhCQUFULENBRGdCLEVBRWhCLDRDQUFXLDhCQUFYLENBRmdCLEVBR2hCLDhDQUFhLDhCQUFiLENBSGdCLEVBSWhCLCtDQUFlLDhCQUFmLE9BSmdCLENBQWxCLFFBS0k7QUFDRjRCLGFBQVNmLE1BRFA7QUFFRmdCLGVBQVdDLEtBQUtDLEdBQUwsR0FBV0MsUUFBWCxFQUZUO0FBR0ZDLGlCQUFhO0FBSFgsR0FMSjs7QUFXQSxNQUFJbEIsV0FBSixFQUFpQjtBQUNmbUIsaUJBQWFDLFlBQWIsR0FBNEJwQixXQUE1QjtBQUNEOztBQUVELDZCQUFPRyxPQUFPQyxNQUFQLENBQ0wsRUFESyxFQUVMO0FBQ0VpQixVQUFNLDRCQUNKdEIsU0FESSxFQUVKZixPQUZJLEVBR0ptQixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQm5CLE9BQWxCLEVBQTJCa0MsWUFBM0IsQ0FISTtBQURSLEdBRkssRUFTTEEsWUFUSyxDQUFQO0FBV0QsQ0FqQ0ssRUFBNEIscUVBQzFCLDhCQUQwQiw0Q0FFdkIsOEJBRnVCLDBDQUd6Qiw4QkFIeUIsOENBSXJCLCtCQUFHLDhCQUFILENBSnFCLDBDQUt4Qiw2Q0FMd0IsZ0NBTWpDLDRDQU5pQyxFQUE1QixDQUFOOztBQW1DQTtBQUNBRyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2YzQixPQUFLQSxHQURVO0FBRWZhLFFBQU1BLElBRlM7QUFHZnBDLHdCQUFzQkEsb0JBSFA7QUFJZjtBQUNBZ0MsNkJBQTJCQTtBQUxaLENBQWpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgcnAgZnJvbSAncmVxdWVzdC1wcm9taXNlJ1xuXG5pbXBvcnQgeyBSRVNQT05TRSB9IGZyb20gJy4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgc2lnblJlcXVlc3QgfSBmcm9tICcuL3NpZ25hdHVyZSdcbmltcG9ydCB0eXBlIHsgS2V5VmFsdWVEaWN0aW9uYXJ5IH0gZnJvbSAnc3JjL3R5cGVzL0NvbW1vbidcbmltcG9ydCB0eXBlIHsgU0RLUmVxdWVzdE1ldGFEYXRhLCBTeXN0ZW1RdWVyeVBhcmFtcyB9IGZyb20gJy4vdHlwZXMvUmVxdWVzdCdcbmltcG9ydCB0eXBlIHsgTGF6YWRhT3BlblBsYXRmb3JtQVBJUmVzcG9uc2UgfSBmcm9tICcuL3R5cGVzL1Jlc3BvbnNlJ1xuXG4vKipcbiAqIERldGVybWluZCBpZiByZXNwb25zZSBpcyBzdWNjZXNzZnVsXG4gKiBAcGFyYW0ge0xhemFkYU9wZW5QbGF0Zm9ybUFQSVJlc3BvbnNlfSByZXNwb25zZVxuICogQHJldHVybiB7Ym9vbGVhbn0gc3VjY2Vzc1xuICovXG5jb25zdCBpc1Jlc3BvbnNlU3VjY2Vzc2Z1bCA9IChcbiAgcmVzcG9uc2U6IExhemFkYU9wZW5QbGF0Zm9ybUFQSVJlc3BvbnNlIHwgYW55LFxuKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHJlc3BvbnNlID09PSAnb2JqZWN0JyAmJlxuICAgIHJlc3BvbnNlICE9PSBudWxsICYmXG4gICAgcmVzcG9uc2UuaGFzT3duUHJvcGVydHkoJ2NvZGUnKSAmJlxuICAgIHJlc3BvbnNlLmNvZGUgPT09IFJFU1BPTlNFLlNVQ0NFU1MuQ09ERVxuICApXG59XG5cbmNvbnN0IGhhbmRsZUxhemFkYVJlc3BvbnNlID0gKFxuICByZXNwb25zZTogTGF6YWRhT3BlblBsYXRmb3JtQVBJUmVzcG9uc2UsXG4gIG1ldGE6IFNES1JlcXVlc3RNZXRhRGF0YSxcbik6IFByb21pc2U8TGF6YWRhT3BlblBsYXRmb3JtQVBJUmVzcG9uc2U+ID0+IHtcbiAgLy8gZm9yIGRlYnVnIG9ubHlcbiAgY29uc3QgX2xvZ19yZXF1ZXN0ID0gKFxuICAgIHsgbWV0aG9kLCBhcGlQYXRoLCBwYXlsb2FkLCBxdWVyeSB9OiBTREtSZXF1ZXN0TWV0YURhdGEsXG4gICAgcmVzcG9uc2UsXG4gICkgPT4ge1xuICAgIGNvbnNvbGUuaW5mbyhcbiAgICAgICdbJXNdICcucmVwbGFjZSgvJXMvLCBtZXRob2QpICsgYXBpUGF0aCxcbiAgICAgICcgJyxcbiAgICAgIHBheWxvYWQsXG4gICAgICAnICcsXG4gICAgICBxdWVyeSxcbiAgICApXG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UsIG51bGwsIDIpKVxuICB9XG4gIC8vIF9sb2dfcmVxdWVzdChtZXRhLCByZXNwb25zZSlcbiAgaWYgKGlzUmVzcG9uc2VTdWNjZXNzZnVsKHJlc3BvbnNlKSkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKVxuICB9XG59XG5cbmNvbnN0IGdldCA9IChcbiAgYmFzZTogc3RyaW5nLFxuICBhcHBLZXk6IHN0cmluZyxcbiAgYXBwU2VjcmV0OiBzdHJpbmcsXG4gIGFwaVBhdGg6IHN0cmluZyxcbiAgYWNjZXNzVG9rZW46ID9zdHJpbmcsXG4gIHBhcmFtcz86IEtleVZhbHVlRGljdGlvbmFyeSxcbik6IFByb21pc2U8TGF6YWRhT3BlblBsYXRmb3JtQVBJUmVzcG9uc2U+ID0+IHtcbiAgY29uc3QgcXMgPSBPYmplY3QuYXNzaWduKFxuICAgIHt9LFxuICAgIHBhcmFtcyxcbiAgICBnZXRTeXN0ZW1RdWVyeVBhcmFtT2JqZWN0KGFwcEtleSwgYXBwU2VjcmV0LCBhcGlQYXRoLCBhY2Nlc3NUb2tlbiwgcGFyYW1zKSxcbiAgKVxuXG4gIHJldHVybiBycCh7XG4gICAgdXJsOiBiYXNlICsgYXBpUGF0aCxcbiAgICBxcyxcbiAgICBqc29uOiB0cnVlLFxuICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICBjb25zdCBtZXRhID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGFwaVBhdGgsXG4gICAgICBwYXlsb2FkOiBwYXJhbXMsXG4gICAgICBxdWVyeTogcXMsXG4gICAgfVxuICAgIHJldHVybiBoYW5kbGVMYXphZGFSZXNwb25zZShyZXNwb25zZSwgbWV0YSlcbiAgfSlcbn1cblxuY29uc3QgcG9zdCA9IChcbiAgYmFzZTogc3RyaW5nLFxuICBhcHBLZXk6IHN0cmluZyxcbiAgYXBwU2VjcmV0OiBzdHJpbmcsXG4gIGFwaVBhdGg6IHN0cmluZyxcbiAgYWNjZXNzVG9rZW46ID9zdHJpbmcsXG4gIGJvZHk/OiBLZXlWYWx1ZURpY3Rpb25hcnksXG4pOiBQcm9taXNlPExhemFkYU9wZW5QbGF0Zm9ybUFQSVJlc3BvbnNlPiA9PiB7XG4gIC8vIHR1cm5zIG91dCBldmVuIGl0J3MgSFRUUCBQT1NULCBMYXphZGEgZXhwZWN0IGBib2R5YCB0byBiZSBwYXJ0IG9mIHF1ZXJ5IHN0cmluZ1xuICBjb25zdCBxcyA9IE9iamVjdC5hc3NpZ24oXG4gICAge30sXG4gICAgYm9keSxcbiAgICBnZXRTeXN0ZW1RdWVyeVBhcmFtT2JqZWN0KGFwcEtleSwgYXBwU2VjcmV0LCBhcGlQYXRoLCBhY2Nlc3NUb2tlbiwgYm9keSksXG4gIClcbiAgcmV0dXJuIHJwKHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB1cmw6IGJhc2UgKyBhcGlQYXRoLFxuICAgIGZvcm06IHFzLFxuICAgIGpzb246IHRydWUsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG4gICAgfSxcbiAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgY29uc3QgbWV0YSA9IHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYXBpUGF0aCxcbiAgICAgIHBheWxvYWQ6IGJvZHksXG4gICAgICBxdWVyeTogcXMsXG4gICAgfVxuICAgIHJldHVybiBoYW5kbGVMYXphZGFSZXNwb25zZShyZXNwb25zZSwgbWV0YSlcbiAgfSlcbn1cblxuLyoqXG4gKiBHYXRoZXIgc3lzdGVtIGFuZCBidXNpbmVzcyBwYXJhbWV0ZXJzIHRvIGNvbXB1dGUgc2lnbmF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBwS2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gYXBwU2VjcmV0XG4gKiBAcGFyYW0ge3N0cmluZ30gYXBpUGF0aFxuICogQHBhcmFtIHtzdHJpbmc/fSBhY2Nlc3NUb2tlblxuICogQHBhcmFtIHtLZXlWYWx1ZURpY3Rpb25hcnk/fSBwYXlsb2FkXG4gKiBAcmV0dXJuIHtTeXN0ZW1RdWVyeVBhcmFtc31cbiAqL1xuY29uc3QgZ2V0U3lzdGVtUXVlcnlQYXJhbU9iamVjdCA9IChcbiAgYXBwS2V5OiBzdHJpbmcsXG4gIGFwcFNlY3JldDogc3RyaW5nLFxuICBhcGlQYXRoOiBzdHJpbmcsXG4gIGFjY2Vzc1Rva2VuOiA/c3RyaW5nLFxuICBwYXlsb2FkPzogS2V5VmFsdWVEaWN0aW9uYXJ5LFxuKTogU3lzdGVtUXVlcnlQYXJhbXMgPT4ge1xuICBjb25zdCBzeXN0ZW1QYXJhbXM6IHtcbiAgICBhcHBfa2V5OiBzdHJpbmcsXG4gICAgdGltZXN0YW1wOiBzdHJpbmcsXG4gICAgc2lnbl9tZXRob2Q6IHN0cmluZyxcbiAgICBhY2Nlc3NfdG9rZW4/OiBzdHJpbmcsXG4gIH0gPSB7XG4gICAgYXBwX2tleTogYXBwS2V5LFxuICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuICAgIHNpZ25fbWV0aG9kOiAnc2hhMjU2JyxcbiAgfVxuXG4gIGlmIChhY2Nlc3NUb2tlbikge1xuICAgIHN5c3RlbVBhcmFtcy5hY2Nlc3NfdG9rZW4gPSBhY2Nlc3NUb2tlblxuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAge30sXG4gICAge1xuICAgICAgc2lnbjogc2lnblJlcXVlc3QoXG4gICAgICAgIGFwcFNlY3JldCxcbiAgICAgICAgYXBpUGF0aCxcbiAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgcGF5bG9hZCwgc3lzdGVtUGFyYW1zKSxcbiAgICAgICksXG4gICAgfSxcbiAgICBzeXN0ZW1QYXJhbXMsXG4gIClcbn1cblxuLy8gY29uc3RydWN0b3Jcbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXQ6IGdldCxcbiAgcG9zdDogcG9zdCxcbiAgaXNSZXNwb25zZVN1Y2Nlc3NmdWw6IGlzUmVzcG9uc2VTdWNjZXNzZnVsLFxuICAvLyBoZWxwZXJcbiAgZ2V0U3lzdGVtUXVlcnlQYXJhbU9iamVjdDogZ2V0U3lzdGVtUXVlcnlQYXJhbU9iamVjdCxcbn1cbiJdfQ==