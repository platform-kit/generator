'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fs = require('fs');
var path = require('path');

Object.assign.apply(Object, [exports].concat(_toConsumableArray(Object.keys(fs).filter(function (key) {
	return key !== 'promises';
}).map(function (key) {
	return _defineProperty({}, key, fs[key]);
})), _toConsumableArray(['access', 'appendFile', 'chmod', 'chown', 'close', 'exists', 'fchmod', 'fchown', 'fdatasync', 'fstat', 'fsync', 'ftruncate', 'futimes', 'lchmod', 'lchown', 'link', 'lstat', 'mkdtemp', 'open', 'read', 'readdir', 'readFile', 'readlink', 'realpath', 'rename', 'rmdir', 'stat', 'symlink', 'truncate', 'unlink', 'utimes', 'write', 'write'].map(function (name) {
	return _defineProperty({}, name, function (pathname) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		return new Promise(function (resolve, reject) {
			return fs[name].apply(fs, [pathname].concat(args, [function (err) {
				for (var _len2 = arguments.length, res = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
					res[_key2 - 1] = arguments[_key2];
				}

				if (err) {
					reject(err);
				} else {
					resolve.apply(undefined, res);
				}
			}]));
		});
	});
})), _toConsumableArray(['mkdir', 'writeFile'].map(function (key) {
	return _defineProperty({}, key, function (pathname) {
		for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
			args[_key3 - 1] = arguments[_key3];
		}

		return new Promise(function (resolve, reject) {
			// execute the native method
			fs[key].apply(fs, [pathname].concat(args, [function (err) {
				// if there is no parent directory
				if (err && err.code === 'ENOENT') {
					// promise to make the parent directory
					exports.mkdir(path.dirname(pathname)).then(
					// and then try again
					function () {
						var _exports;

						return (_exports = exports)[key].apply(_exports, [pathname].concat(args));
					}).then(resolve);
				} else if (err && err.code !== 'EEXIST') {
					// otherwise, reject any error not about an existing directory
					reject(err);
				} else {
					// otherwise, resolve
					resolve();
				}
			}]));
		});
	});
})), _toConsumableArray(['mkdirSync', 'writeFileSync'].map(function (key) {
	return _defineProperty({}, key, function (pathname) {
		for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
			args[_key4 - 1] = arguments[_key4];
		}

		try {
			// try to execute the native method
			fs[key].apply(fs, [pathname].concat(args));
		} catch (err) {
			// if there is no parent directory
			if (err && err.code === 'ENOENT') {
				var _exports2;

				// make the parent directory
				exports.mkdirSync(path.dirname(pathname));

				// and then try again
				(_exports2 = exports)[key].apply(_exports2, [pathname].concat(args));
			} else if (err && err.code !== 'EEXIST') {
				// otherwise, throw any error not about an existing directory
				throw err;
			}
		}
	});
})), [

// copydir
{
	copydir: function copydir(source, target) {
		return exports.mkdir(target).then(
		// make the target directory, then promise to read the source directory
		function () {
			return exports.readdir(source);
		}).then(
		// promise to copy the contents of the source directory
		function (children) {
			return Promise.all(children.map(function (child) {
				var sourceChild = path.resolve(source, child);
				var targetChild = path.resolve(target, child);

				// promise the appropriate copy of the child
				return exports.lstat(sourceChild).then(function (lstat) {
					return lstat.isDirectory() ? exports.copydir(sourceChild, targetChild) : exports.copyFile(sourceChild, targetChild);
				});
			})).then(function () {
				return Promise.resolve();
			});
		});
	}
},

// copydirSync
{
	copydirSync: function copydirSync(source, target) {
		// make the target directory
		exports.mkdirSync(target);

		// read the source directory
		var children = exports.readdirSync(source);

		// copy the contents of the source directory
		children.forEach(function (child) {
			var sourceChild = path.resolve(source, child);
			var targetChild = path.resolve(target, child);

			var lstat = exports.lstatSync(sourceChild);

			// execute the appropriate copy of the child
			if (lstat.isDirectory()) {
				exports.copydirSync(sourceChild, targetChild);
			} else {
				exports.copyFileSync(sourceChild, targetChild);
			}
		});
	}
},

// copyFile
{
	copyFile: function copyFile(source, target) {
		return exports.touchFile(target).then(
		// make the target directory, then promise to copy the file
		function () {
			return new Promise(function (resolve, reject) {
				// create streams
				var readStream = exports.createReadStream(path.resolve(source));
				var writeStream = exports.createWriteStream(path.resolve(target));

				// reject on read error
				readStream.on('error', prereject);

				// reject on write error
				writeStream.on('error', prereject);

				// resolve on finish
				writeStream.on('finish', resolve);

				// copy stream
				readStream.pipe(writeStream);

				function prereject(err) {
					// destroy streams
					readStream.destroy();
					writeStream.end();

					// reject with error
					reject(err);
				}
			});
		});
	}
},

// copyFileSync
{
	copyFileSync: function copyFileSync(source, target) {
		// make the target directory
		exports.mkdirSync(path.dirname(target));

		// buffer
		var bufferLength = 64 * 1024;
		var buffer = Buffer.alloc(bufferLength);

		// position
		var bytesRead = 1;
		var position = 0;

		// open the reader and writer
		var reader = fs.openSync(source, 'r');
		var writer = fs.openSync(target, 'w');

		// copy the file
		while (bytesRead > 0) {
			bytesRead = fs.readSync(reader, buffer, 0, bufferLength, position);

			fs.writeSync(writer, buffer, 0, bytesRead);

			position += bytesRead;
		}

		// close the reader and writer
		fs.closeSync(reader);
		fs.closeSync(writer);
	}
},

// readJson
{
	readJson: function readJson(filename) {
		return exports.readFile(filename, 'utf8').then(JSON.parse);
	}
},

// readJsonSync
{
	readJsonSync: function readJsonSync(filename) {
		return JSON.parse(exports.readFileSync(filename, 'utf8'));
	}
},

// rmdir
{
	rmdir: function rmdir(dirname) {
		return new Promise(function (resolve, reject) {
			// remove the directory
			fs.rmdir(dirname, function (err) {
				// if there is an error about the directory not being empty
				if (err && err.code === 'ENOTEMPTY') {
					// resolve to read the directory
					resolve(exports.readdir(dirname).then(
					// promise to remove each child of the directory
					function (children) {
						return Promise.all(children.map(function (child) {
							var resolvedChild = path.resolve(dirname, child);

							// promise to remove of the child
							return exports.lstat(resolvedChild).then(function (lstat) {
								return lstat.isDirectory() ? exports.rmdir(resolvedChild) : exports.unlink(resolvedChild);
							});
						}));
					}).then(
					// and then try again
					function () {
						return exports.rmdir(dirname);
					}));
				} else if (err) {
					// otherwise, reject any error
					reject(err);
				} else {
					// otherwise, resolve
					resolve();
				}
			});
		});
	}
},

// rmdirSync
{
	rmdirSync: function rmdirSync(dirname) {
		try {
			// try to remove the directory
			fs.rmdirSync(dirname);
		} catch (err) {
			// if there is an error about the directory not being empty
			if (err && err.code === 'ENOTEMPTY') {
				var children = exports.readdirSync(dirname);

				// remove each child of the directory
				children.forEach(function (child) {
					var resolvedChild = path.resolve(dirname, child);

					var lstat = exports.lstatSync(resolvedChild);

					// remove the child
					if (lstat.isDirectory()) {
						exports.rmdirSync(resolvedChild);
					} else {
						exports.unlinkSync(resolvedChild);
					}
				});

				// and then try again
				exports.rmdirSync(dirname);
			} else {
				// otherwise, throw any error
				throw err;
			}
		}
	}
},

// touchFile
{
	touchFile: function touchFile(filename) {
		return new Promise(function (resolve, reject) {
			// touch the file
			fs.open(filename, 'wx', function (err) {
				// if there is no parent directory
				if (err && err.code === 'ENOENT') {
					// promise to make the parent directory
					exports.mkdir(path.dirname(filename)).then(
					// and then try again
					function () {
						return exports.touchFile(filename);
					}).then(resolve);
				} else if (err && err.code !== 'EEXIST') {
					// otherwise, reject any error not about the directory already existing
					reject(err);
				} else {
					// otherwise, resolve
					resolve();
				}
			});
		});
	}
},

// touchFileSync
{
	touchFileSync: function touchFileSync(filename) {
		try {
			// try to touch the file
			fs.openSync(filename, 'wx');
		} catch (err) {
			// if there is no parent directory
			if (err && err.code === 'ENOENT') {
				// make the parent directory
				exports.mkdirSync(path.dirname(filename));

				// and then try again
				exports.touchFileSync(filename);
			} else if (err && err.code !== 'EEXIST') {
				// otherwise, throw any error not about the directory already existing
				throw err;
			}
		}
	}
}]));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBZSxpQ0FBWTtBQUMxQixNQUFJO0FBQ0g7QUFDQSxNQUFHLFFBQUgsQ0FBWSxRQUFaLEVBQXNCLElBQXRCO0FBQ0EsR0FIRCxDQUdFLE9BQU8sR0FBUCxFQUFZO0FBQ2I7QUFDQSxPQUFJLE9BQU8sSUFBSSxJQUFKLEtBQWEsUUFBeEIsRUFBa0M7QUFDakM7QUFDQSxZQUFRLFNBQVIsQ0FBa0IsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFsQjs7QUFFQTtBQUNBLFlBQVEsYUFBUixDQUFzQixRQUF0QjtBQUNBLElBTkQsTUFNTyxJQUFJLE9BQU8sSUFBSSxJQUFKLEtBQWEsUUFBeEIsRUFBa0M7QUFDeEM7QUFDQSxVQUFNLEdBQU47QUFDQTtBQUNEO0FBQ0Q7QUFsQkYsQ0EvVkQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmcyAgID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbk9iamVjdC5hc3NpZ24oXG5cdGV4cG9ydHMsXG5cdC4uLk9iamVjdC5rZXlzKGZzKS5maWx0ZXIoa2V5ID0+IGtleSAhPT0gJ3Byb21pc2VzJykubWFwKGtleSA9PiAoe1xuXHRcdFtrZXldOiBmc1trZXldXG5cdH0pKSxcblx0Li4uW1xuXHRcdCdhY2Nlc3MnLFxuXHRcdCdhcHBlbmRGaWxlJyxcblx0XHQnY2htb2QnLFxuXHRcdCdjaG93bicsXG5cdFx0J2Nsb3NlJyxcblx0XHQnZXhpc3RzJyxcblx0XHQnZmNobW9kJyxcblx0XHQnZmNob3duJyxcblx0XHQnZmRhdGFzeW5jJyxcblx0XHQnZnN0YXQnLFxuXHRcdCdmc3luYycsXG5cdFx0J2Z0cnVuY2F0ZScsXG5cdFx0J2Z1dGltZXMnLFxuXHRcdCdsY2htb2QnLFxuXHRcdCdsY2hvd24nLFxuXHRcdCdsaW5rJyxcblx0XHQnbHN0YXQnLFxuXHRcdCdta2R0ZW1wJyxcblx0XHQnb3BlbicsXG5cdFx0J3JlYWQnLFxuXHRcdCdyZWFkZGlyJyxcblx0XHQncmVhZEZpbGUnLFxuXHRcdCdyZWFkbGluaycsXG5cdFx0J3JlYWxwYXRoJyxcblx0XHQncmVuYW1lJyxcblx0XHQncm1kaXInLFxuXHRcdCdzdGF0Jyxcblx0XHQnc3ltbGluaycsXG5cdFx0J3RydW5jYXRlJyxcblx0XHQndW5saW5rJyxcblx0XHQndXRpbWVzJyxcblx0XHQnd3JpdGUnLFxuXHRcdCd3cml0ZSdcblx0XS5tYXAoXG5cdFx0bmFtZSA9PiAoe1xuXHRcdFx0W25hbWVdOiAocGF0aG5hbWUsIC4uLmFyZ3MpID0+IG5ldyBQcm9taXNlKFxuXHRcdFx0XHQocmVzb2x2ZSwgcmVqZWN0KSA9PiBmc1tuYW1lXShwYXRobmFtZSwgLi4uYXJncyxcblx0XHRcdFx0XHQoZXJyLCAuLi5yZXMpID0+IHtcblx0XHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKC4uLnJlcyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0fSlcblx0KSxcblxuXHQvLyBta2RpciArIHdyaXRlRmlsZVxuXHQuLi5bJ21rZGlyJywgJ3dyaXRlRmlsZSddLm1hcChcblx0XHRrZXkgPT4gKHtcblx0XHRcdFtrZXldOiAocGF0aG5hbWUsIC4uLmFyZ3MpID0+IG5ldyBQcm9taXNlKFxuXHRcdFx0XHQocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0Ly8gZXhlY3V0ZSB0aGUgbmF0aXZlIG1ldGhvZFxuXHRcdFx0XHRcdGZzW2tleV0oXG5cdFx0XHRcdFx0XHRwYXRobmFtZSxcblx0XHRcdFx0XHRcdC4uLmFyZ3MsXG5cdFx0XHRcdFx0XHQoZXJyKSA9PiB7XG5cdFx0XHRcdFx0XHRcdC8vIGlmIHRoZXJlIGlzIG5vIHBhcmVudCBkaXJlY3Rvcnlcblx0XHRcdFx0XHRcdFx0aWYgKGVyciAmJiBlcnIuY29kZSA9PT0gJ0VOT0VOVCcpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBwcm9taXNlIHRvIG1ha2UgdGhlIHBhcmVudCBkaXJlY3Rvcnlcblx0XHRcdFx0XHRcdFx0XHRleHBvcnRzLm1rZGlyKHBhdGguZGlybmFtZShwYXRobmFtZSkpLnRoZW4oXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBhbmQgdGhlbiB0cnkgYWdhaW5cblx0XHRcdFx0XHRcdFx0XHRcdCgpID0+IGV4cG9ydHNba2V5XShwYXRobmFtZSwgLi4uYXJncylcblx0XHRcdFx0XHRcdFx0XHQpLnRoZW4ocmVzb2x2ZSk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZXJyICYmIGVyci5jb2RlICE9PSAnRUVYSVNUJykge1xuXHRcdFx0XHRcdFx0XHRcdC8vIG90aGVyd2lzZSwgcmVqZWN0IGFueSBlcnJvciBub3QgYWJvdXQgYW4gZXhpc3RpbmcgZGlyZWN0b3J5XG5cdFx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gb3RoZXJ3aXNlLCByZXNvbHZlXG5cdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0KVxuXHRcdH0pXG5cdCksXG5cblx0Ly8gbWtkaXJTeW5jLCB3cml0ZUZpbGVTeW5jXG5cdC4uLlsnbWtkaXJTeW5jJywgJ3dyaXRlRmlsZVN5bmMnXS5tYXAoXG5cdFx0a2V5ID0+ICh7XG5cdFx0XHRba2V5XTogKHBhdGhuYW1lLCAuLi5hcmdzKSA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gdHJ5IHRvIGV4ZWN1dGUgdGhlIG5hdGl2ZSBtZXRob2Rcblx0XHRcdFx0XHRmc1trZXldKHBhdGhuYW1lLCAuLi5hcmdzKTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlcmUgaXMgbm8gcGFyZW50IGRpcmVjdG9yeVxuXHRcdFx0XHRcdGlmIChlcnIgJiYgZXJyLmNvZGUgPT09ICdFTk9FTlQnKSB7XG5cdFx0XHRcdFx0XHQvLyBtYWtlIHRoZSBwYXJlbnQgZGlyZWN0b3J5XG5cdFx0XHRcdFx0XHRleHBvcnRzLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUocGF0aG5hbWUpKTtcblxuXHRcdFx0XHRcdFx0Ly8gYW5kIHRoZW4gdHJ5IGFnYWluXG5cdFx0XHRcdFx0XHRleHBvcnRzW2tleV0ocGF0aG5hbWUsIC4uLmFyZ3MpXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChlcnIgJiYgZXJyLmNvZGUgIT09ICdFRVhJU1QnKSB7XG5cdFx0XHRcdFx0XHQvLyBvdGhlcndpc2UsIHRocm93IGFueSBlcnJvciBub3QgYWJvdXQgYW4gZXhpc3RpbmcgZGlyZWN0b3J5XG5cdFx0XHRcdFx0XHR0aHJvdyBlcnI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSlcblx0KSxcblxuXHQvLyBjb3B5ZGlyXG5cdHtcblx0XHRjb3B5ZGlyOiAoc291cmNlLCB0YXJnZXQpID0+IGV4cG9ydHMubWtkaXIodGFyZ2V0KS50aGVuKFxuXHRcdFx0Ly8gbWFrZSB0aGUgdGFyZ2V0IGRpcmVjdG9yeSwgdGhlbiBwcm9taXNlIHRvIHJlYWQgdGhlIHNvdXJjZSBkaXJlY3Rvcnlcblx0XHRcdCgpID0+IGV4cG9ydHMucmVhZGRpcihzb3VyY2UpXG5cdFx0KS50aGVuKFxuXHRcdFx0Ly8gcHJvbWlzZSB0byBjb3B5IHRoZSBjb250ZW50cyBvZiB0aGUgc291cmNlIGRpcmVjdG9yeVxuXHRcdFx0Y2hpbGRyZW4gPT4gUHJvbWlzZS5hbGwoXG5cdFx0XHRcdGNoaWxkcmVuLm1hcChcblx0XHRcdFx0XHRjaGlsZCA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBzb3VyY2VDaGlsZCA9IHBhdGgucmVzb2x2ZShzb3VyY2UsIGNoaWxkKTtcblx0XHRcdFx0XHRcdGNvbnN0IHRhcmdldENoaWxkID0gcGF0aC5yZXNvbHZlKHRhcmdldCwgY2hpbGQpO1xuXG5cdFx0XHRcdFx0XHQvLyBwcm9taXNlIHRoZSBhcHByb3ByaWF0ZSBjb3B5IG9mIHRoZSBjaGlsZFxuXHRcdFx0XHRcdFx0cmV0dXJuIGV4cG9ydHMubHN0YXQoc291cmNlQ2hpbGQpLnRoZW4oXG5cdFx0XHRcdFx0XHRcdGxzdGF0ID0+IGxzdGF0LmlzRGlyZWN0b3J5KClcblx0XHRcdFx0XHRcdFx0XHQ/IGV4cG9ydHMuY29weWRpcihzb3VyY2VDaGlsZCwgdGFyZ2V0Q2hpbGQpXG5cdFx0XHRcdFx0XHRcdDogZXhwb3J0cy5jb3B5RmlsZShzb3VyY2VDaGlsZCwgdGFyZ2V0Q2hpbGQpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0KVxuXHRcdFx0KS50aGVuKFxuXHRcdFx0XHQoKSA9PiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdFx0KVxuXHRcdClcblx0fSxcblxuXHQvLyBjb3B5ZGlyU3luY1xuXHR7XG5cdFx0Y29weWRpclN5bmM6IChzb3VyY2UsIHRhcmdldCkgPT4ge1xuXHRcdFx0Ly8gbWFrZSB0aGUgdGFyZ2V0IGRpcmVjdG9yeVxuXHRcdFx0ZXhwb3J0cy5ta2RpclN5bmModGFyZ2V0KTtcblxuXHRcdFx0Ly8gcmVhZCB0aGUgc291cmNlIGRpcmVjdG9yeVxuXHRcdFx0Y29uc3QgY2hpbGRyZW4gPSBleHBvcnRzLnJlYWRkaXJTeW5jKHNvdXJjZSlcblxuXHRcdFx0Ly8gY29weSB0aGUgY29udGVudHMgb2YgdGhlIHNvdXJjZSBkaXJlY3Rvcnlcblx0XHRcdGNoaWxkcmVuLmZvckVhY2goXG5cdFx0XHRcdGNoaWxkID0+IHtcblx0XHRcdFx0XHRjb25zdCBzb3VyY2VDaGlsZCA9IHBhdGgucmVzb2x2ZShzb3VyY2UsIGNoaWxkKTtcblx0XHRcdFx0XHRjb25zdCB0YXJnZXRDaGlsZCA9IHBhdGgucmVzb2x2ZSh0YXJnZXQsIGNoaWxkKTtcblxuXHRcdFx0XHRcdGNvbnN0IGxzdGF0ID0gZXhwb3J0cy5sc3RhdFN5bmMoc291cmNlQ2hpbGQpO1xuXG5cdFx0XHRcdFx0Ly8gZXhlY3V0ZSB0aGUgYXBwcm9wcmlhdGUgY29weSBvZiB0aGUgY2hpbGRcblx0XHRcdFx0XHRpZiAobHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuXHRcdFx0XHRcdFx0ZXhwb3J0cy5jb3B5ZGlyU3luYyhzb3VyY2VDaGlsZCwgdGFyZ2V0Q2hpbGQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRleHBvcnRzLmNvcHlGaWxlU3luYyhzb3VyY2VDaGlsZCwgdGFyZ2V0Q2hpbGQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cdH0sXG5cblx0Ly8gY29weUZpbGVcblx0e1xuXHRcdGNvcHlGaWxlOiAoc291cmNlLCB0YXJnZXQpID0+IGV4cG9ydHMudG91Y2hGaWxlKHRhcmdldCkudGhlbihcblx0XHRcdC8vIG1ha2UgdGhlIHRhcmdldCBkaXJlY3RvcnksIHRoZW4gcHJvbWlzZSB0byBjb3B5IHRoZSBmaWxlXG5cdFx0XHQoKSA9PiBuZXcgUHJvbWlzZShcblx0XHRcdFx0KHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdC8vIGNyZWF0ZSBzdHJlYW1zXG5cdFx0XHRcdFx0Y29uc3QgcmVhZFN0cmVhbSAgPSBleHBvcnRzLmNyZWF0ZVJlYWRTdHJlYW0ocGF0aC5yZXNvbHZlKHNvdXJjZSkpO1xuXHRcdFx0XHRcdGNvbnN0IHdyaXRlU3RyZWFtID0gZXhwb3J0cy5jcmVhdGVXcml0ZVN0cmVhbShwYXRoLnJlc29sdmUodGFyZ2V0KSk7XG5cblx0XHRcdFx0XHQvLyByZWplY3Qgb24gcmVhZCBlcnJvclxuXHRcdFx0XHRcdHJlYWRTdHJlYW0ub24oJ2Vycm9yJywgcHJlcmVqZWN0KTtcblxuXHRcdFx0XHRcdC8vIHJlamVjdCBvbiB3cml0ZSBlcnJvclxuXHRcdFx0XHRcdHdyaXRlU3RyZWFtLm9uKCdlcnJvcicsIHByZXJlamVjdCk7XG5cblx0XHRcdFx0XHQvLyByZXNvbHZlIG9uIGZpbmlzaFxuXHRcdFx0XHRcdHdyaXRlU3RyZWFtLm9uKCdmaW5pc2gnLCByZXNvbHZlKTtcblxuXHRcdFx0XHRcdC8vIGNvcHkgc3RyZWFtXG5cdFx0XHRcdFx0cmVhZFN0cmVhbS5waXBlKHdyaXRlU3RyZWFtKTtcblxuXHRcdFx0XHRcdGZ1bmN0aW9uIHByZXJlamVjdChlcnIpIHtcblx0XHRcdFx0XHRcdC8vIGRlc3Ryb3kgc3RyZWFtc1xuXHRcdFx0XHRcdFx0cmVhZFN0cmVhbS5kZXN0cm95KCk7XG5cdFx0XHRcdFx0XHR3cml0ZVN0cmVhbS5lbmQoKTtcblxuXHRcdFx0XHRcdFx0Ly8gcmVqZWN0IHdpdGggZXJyb3Jcblx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KVxuXHRcdClcblx0fSxcblxuXHQvLyBjb3B5RmlsZVN5bmNcblx0e1xuXHRcdGNvcHlGaWxlU3luYzogKHNvdXJjZSwgdGFyZ2V0KSA9PiB7XG5cdFx0XHQvLyBtYWtlIHRoZSB0YXJnZXQgZGlyZWN0b3J5XG5cdFx0XHRleHBvcnRzLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUodGFyZ2V0KSk7XG5cblx0XHRcdC8vIGJ1ZmZlclxuXHRcdFx0Y29uc3QgYnVmZmVyTGVuZ3RoID0gNjQgKiAxMDI0O1xuXHRcdFx0Y29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jKGJ1ZmZlckxlbmd0aCk7XG5cblx0XHRcdC8vIHBvc2l0aW9uXG5cdFx0XHRsZXQgYnl0ZXNSZWFkID0gMTtcblx0XHRcdGxldCBwb3NpdGlvbiA9IDA7XG5cblx0XHRcdC8vIG9wZW4gdGhlIHJlYWRlciBhbmQgd3JpdGVyXG5cdFx0XHRjb25zdCByZWFkZXIgPSBmcy5vcGVuU3luYyhzb3VyY2UsICdyJyk7XG5cdFx0XHRjb25zdCB3cml0ZXIgPSBmcy5vcGVuU3luYyh0YXJnZXQsICd3Jyk7XG5cblx0XHRcdC8vIGNvcHkgdGhlIGZpbGVcblx0XHRcdHdoaWxlIChieXRlc1JlYWQgPiAwKSB7XG5cdFx0XHRcdGJ5dGVzUmVhZCA9IGZzLnJlYWRTeW5jKHJlYWRlciwgYnVmZmVyLCAwLCBidWZmZXJMZW5ndGgsIHBvc2l0aW9uKTtcblxuXHRcdFx0XHRmcy53cml0ZVN5bmMod3JpdGVyLCBidWZmZXIsIDAsIGJ5dGVzUmVhZCk7XG5cblx0XHRcdFx0cG9zaXRpb24gKz0gYnl0ZXNSZWFkO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjbG9zZSB0aGUgcmVhZGVyIGFuZCB3cml0ZXJcblx0XHRcdGZzLmNsb3NlU3luYyhyZWFkZXIpO1xuXHRcdFx0ZnMuY2xvc2VTeW5jKHdyaXRlcik7XG5cdFx0fVxuXHR9LFxuXG5cdC8vIHJlYWRKc29uXG5cdHtcblx0XHRyZWFkSnNvbjogZmlsZW5hbWUgPT4gZXhwb3J0cy5yZWFkRmlsZShmaWxlbmFtZSwgJ3V0ZjgnKS50aGVuKEpTT04ucGFyc2UpXG5cdH0sXG5cblx0Ly8gcmVhZEpzb25TeW5jXG5cdHtcblx0XHRyZWFkSnNvblN5bmM6IGZpbGVuYW1lID0+IEpTT04ucGFyc2UoZXhwb3J0cy5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JykpXG5cdH0sXG5cblx0Ly8gcm1kaXJcblx0e1xuXHRcdHJtZGlyOiBkaXJuYW1lID0+IG5ldyBQcm9taXNlKFxuXHRcdFx0KHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHQvLyByZW1vdmUgdGhlIGRpcmVjdG9yeVxuXHRcdFx0XHRmcy5ybWRpcihkaXJuYW1lLFxuXHRcdFx0XHRcdGVyciA9PiB7XG5cdFx0XHRcdFx0XHQvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciBhYm91dCB0aGUgZGlyZWN0b3J5IG5vdCBiZWluZyBlbXB0eVxuXHRcdFx0XHRcdFx0aWYgKGVyciAmJiBlcnIuY29kZSA9PT0gJ0VOT1RFTVBUWScpIHtcblx0XHRcdFx0XHRcdFx0Ly8gcmVzb2x2ZSB0byByZWFkIHRoZSBkaXJlY3Rvcnlcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZShleHBvcnRzLnJlYWRkaXIoZGlybmFtZSkudGhlbihcblx0XHRcdFx0XHRcdFx0XHQvLyBwcm9taXNlIHRvIHJlbW92ZSBlYWNoIGNoaWxkIG9mIHRoZSBkaXJlY3Rvcnlcblx0XHRcdFx0XHRcdFx0XHRjaGlsZHJlbiA9PiBQcm9taXNlLmFsbChcblx0XHRcdFx0XHRcdFx0XHRcdGNoaWxkcmVuLm1hcChcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hpbGQgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHJlc29sdmVkQ2hpbGQgPSBwYXRoLnJlc29sdmUoZGlybmFtZSwgY2hpbGQpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gcHJvbWlzZSB0byByZW1vdmUgb2YgdGhlIGNoaWxkXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGV4cG9ydHMubHN0YXQocmVzb2x2ZWRDaGlsZCkudGhlbihcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxzdGF0ID0+IGxzdGF0LmlzRGlyZWN0b3J5KClcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PyBleHBvcnRzLnJtZGlyKHJlc29sdmVkQ2hpbGQpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IGV4cG9ydHMudW5saW5rKHJlc29sdmVkQ2hpbGQpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0KS50aGVuKFxuXHRcdFx0XHRcdFx0XHRcdC8vIGFuZCB0aGVuIHRyeSBhZ2FpblxuXHRcdFx0XHRcdFx0XHRcdCgpID0+IGV4cG9ydHMucm1kaXIoZGlybmFtZSlcblx0XHRcdFx0XHRcdFx0KSk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGVycikge1xuXHRcdFx0XHRcdFx0XHQvLyBvdGhlcndpc2UsIHJlamVjdCBhbnkgZXJyb3Jcblx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyBvdGhlcndpc2UsIHJlc29sdmVcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHQpXG5cdH0sXG5cblx0Ly8gcm1kaXJTeW5jXG5cdHtcblx0XHRybWRpclN5bmM6IGRpcm5hbWUgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gdHJ5IHRvIHJlbW92ZSB0aGUgZGlyZWN0b3J5XG5cdFx0XHRcdGZzLnJtZGlyU3luYyhkaXJuYW1lKTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHQvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciBhYm91dCB0aGUgZGlyZWN0b3J5IG5vdCBiZWluZyBlbXB0eVxuXHRcdFx0XHRpZiAoZXJyICYmIGVyci5jb2RlID09PSAnRU5PVEVNUFRZJykge1xuXHRcdFx0XHRcdGNvbnN0IGNoaWxkcmVuID0gZXhwb3J0cy5yZWFkZGlyU3luYyhkaXJuYW1lKTtcblxuXHRcdFx0XHRcdC8vIHJlbW92ZSBlYWNoIGNoaWxkIG9mIHRoZSBkaXJlY3Rvcnlcblx0XHRcdFx0XHRjaGlsZHJlbi5mb3JFYWNoKFxuXHRcdFx0XHRcdFx0Y2hpbGQgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCByZXNvbHZlZENoaWxkID0gcGF0aC5yZXNvbHZlKGRpcm5hbWUsIGNoaWxkKTtcblxuXHRcdFx0XHRcdFx0XHRjb25zdCBsc3RhdCA9IGV4cG9ydHMubHN0YXRTeW5jKHJlc29sdmVkQ2hpbGQpO1xuXG5cdFx0XHRcdFx0XHRcdC8vIHJlbW92ZSB0aGUgY2hpbGRcblx0XHRcdFx0XHRcdFx0aWYgKGxzdGF0LmlzRGlyZWN0b3J5KCkpIHtcblx0XHRcdFx0XHRcdFx0XHRleHBvcnRzLnJtZGlyU3luYyhyZXNvbHZlZENoaWxkKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRleHBvcnRzLnVubGlua1N5bmMocmVzb2x2ZWRDaGlsZCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0Ly8gYW5kIHRoZW4gdHJ5IGFnYWluXG5cdFx0XHRcdFx0ZXhwb3J0cy5ybWRpclN5bmMoZGlybmFtZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gb3RoZXJ3aXNlLCB0aHJvdyBhbnkgZXJyb3Jcblx0XHRcdFx0XHR0aHJvdyBlcnI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Ly8gdG91Y2hGaWxlXG5cdHtcblx0XHR0b3VjaEZpbGU6IGZpbGVuYW1lID0+IG5ldyBQcm9taXNlKFxuXHRcdFx0KHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHQvLyB0b3VjaCB0aGUgZmlsZVxuXHRcdFx0XHRmcy5vcGVuKGZpbGVuYW1lLCAnd3gnLFxuXHRcdFx0XHRcdChlcnIpID0+IHtcblx0XHRcdFx0XHRcdC8vIGlmIHRoZXJlIGlzIG5vIHBhcmVudCBkaXJlY3Rvcnlcblx0XHRcdFx0XHRcdGlmIChlcnIgJiYgZXJyLmNvZGUgPT09ICdFTk9FTlQnKSB7XG5cdFx0XHRcdFx0XHRcdC8vIHByb21pc2UgdG8gbWFrZSB0aGUgcGFyZW50IGRpcmVjdG9yeVxuXHRcdFx0XHRcdFx0XHRleHBvcnRzLm1rZGlyKHBhdGguZGlybmFtZShmaWxlbmFtZSkpLnRoZW4oXG5cdFx0XHRcdFx0XHRcdFx0Ly8gYW5kIHRoZW4gdHJ5IGFnYWluXG5cdFx0XHRcdFx0XHRcdFx0KCkgPT4gZXhwb3J0cy50b3VjaEZpbGUoZmlsZW5hbWUpXG5cdFx0XHRcdFx0XHRcdCkudGhlbihyZXNvbHZlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZXJyICYmIGVyci5jb2RlICE9PSAnRUVYSVNUJykge1xuXHRcdFx0XHRcdFx0XHQvLyBvdGhlcndpc2UsIHJlamVjdCBhbnkgZXJyb3Igbm90IGFib3V0IHRoZSBkaXJlY3RvcnkgYWxyZWFkeSBleGlzdGluZ1xuXHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIG90aGVyd2lzZSwgcmVzb2x2ZVxuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdClcblx0fSxcblxuXHQvLyB0b3VjaEZpbGVTeW5jXG5cdHtcblx0XHR0b3VjaEZpbGVTeW5jOiBmaWxlbmFtZSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyB0cnkgdG8gdG91Y2ggdGhlIGZpbGVcblx0XHRcdFx0ZnMub3BlblN5bmMoZmlsZW5hbWUsICd3eCcpO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdC8vIGlmIHRoZXJlIGlzIG5vIHBhcmVudCBkaXJlY3Rvcnlcblx0XHRcdFx0aWYgKGVyciAmJiBlcnIuY29kZSA9PT0gJ0VOT0VOVCcpIHtcblx0XHRcdFx0XHQvLyBtYWtlIHRoZSBwYXJlbnQgZGlyZWN0b3J5XG5cdFx0XHRcdFx0ZXhwb3J0cy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSk7XG5cblx0XHRcdFx0XHQvLyBhbmQgdGhlbiB0cnkgYWdhaW5cblx0XHRcdFx0XHRleHBvcnRzLnRvdWNoRmlsZVN5bmMoZmlsZW5hbWUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVyciAmJiBlcnIuY29kZSAhPT0gJ0VFWElTVCcpIHtcblx0XHRcdFx0XHQvLyBvdGhlcndpc2UsIHRocm93IGFueSBlcnJvciBub3QgYWJvdXQgdGhlIGRpcmVjdG9yeSBhbHJlYWR5IGV4aXN0aW5nXG5cdFx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG4pO1xuIl19