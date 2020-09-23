// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils')
const acceptedQuerystring = ['wait_for_active_shards', 'refresh', 'routing', 'timeout', 'type', '_source', '_source_excludes', '_source_exclude', '_source_includes', '_source_include', 'pipeline', 'require_alias', 'pretty', 'human', 'error_trace', 'source', 'filter_path']
const snakeCase = { waitForActiveShards: 'wait_for_active_shards', _sourceExcludes: '_source_excludes', _sourceExclude: '_source_exclude', _sourceIncludes: '_source_includes', _sourceInclude: '_source_include', requireAlias: 'require_alias', errorTrace: 'error_trace', filterPath: 'filter_path' }

<<<<<<< HEAD
  const acceptedQuerystring = [
    'wait_for_active_shards',
    'refresh',
    'routing',
    'timeout',
    'type',
    '_source',
    '_source_excludes',
    '_source_exclude',
    '_source_includes',
    '_source_include',
    'pipeline',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    waitForActiveShards: 'wait_for_active_shards',
    _sourceExcludes: '_source_excludes',
    _sourceExclude: '_source_exclude',
    _sourceIncludes: '_source_includes',
    _sourceInclude: '_source_include',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
=======
function bulkApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['body'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
>>>>>>> a064f0f3... Improve child performances (#1314)
  }

  // check required url components
  if (params['type'] != null && (params['index'] == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: index')
    return handleError(err, callback)
  }

  var { method, body, index, type, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((index) != null && (type) != null) {
    if (method == null) method = 'POST'
    path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_bulk'
  } else if ((index) != null) {
    if (method == null) method = 'POST'
    path = '/' + encodeURIComponent(index) + '/' + '_bulk'
  } else {
    if (method == null) method = 'POST'
    path = '/' + '_bulk'
  }

  // build request object
  const request = {
    method,
    path,
    bulkBody: body,
    querystring
  }

  return this.transport.request(request, options, callback)
}

module.exports = bulkApi
