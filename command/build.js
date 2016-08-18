const fs = require('fs');
const envPath = process.cwd();
const exec = require('child_process').exec;
const chalk = require('chalk');
const fse = require('fs-extra');
const path = require('path');

// 仓库名
const frameDir = [
	'sparrow',
	'neoui',
	'kero',
	'kero-adapter'
];

// npm包名
const npmDir = [ 
	'neoui-sparrow',
	'neoui',
	'kero',
	'kero-adapter'	
];
const dirs = fs.readdirSync(envPath); // 输出当前目录下的目录名

module.exports = () => {
	
	var buildFun = {
		init: function() {
			this.whole();

			if (this.iswhole === true) {
				console.log('仓库已准备好');

				npmDir.forEach(function(name){
					this.copy(name);
				});

			} else {
				console.log('请在此目录下，完成%s仓库内容下载',frameDir);
			}

			this.dist();

		},

		iswhole: false,

		/**
		 * 判断是否下载完整框架文件
		 */
		whole: function(){
			
			// console.log(dirs);
			var i = 0;
			frameDir.forEach(function(name){
				if(dirs.indexOf(name) != -1){
					i++;
				}
			});

			if(i === frameDir.length){
				this.iswhole = true;
			}

			// 执行git clone命令
			/**
			var gitst = `git clone git@github.com:onvno/techcollect.git`;
		    exec(gitst, (error, stdout, stderr) => {
		      if (error) {
		        console.log(error)
		        process.exit()
		      }
		      console.log(chalk.green('\n √ Generation completed!'))
		      process.exit()
		    })
		    */
		},

		/**
		 * 复制拷贝各仓库js文件到kero-adapter下
		 */
		copy: function(copyname){
			var paths = fs.readdirSync(envPath);
			var copyAry = [];

			var loopFun = function(paths) {

				paths.forEach(function(path){
					// 此处路径不能使用__dirname,会指向插件的路径
					var _path = envPath + '/' + path + '/node_modules';
					var nextMod = path + '/node_modules';
					// console.log(_path);

					// 判断子集nodemodules是否存在
					if(fs.existsSync(_path)){
						fs.stat(_path, function(err, st){
							
							if(st.isDirectory()){
								// 存在
								var subpaths = fs.readdirSync(_path);
								subpaths.forEach(function(subpath) {
									console.log(subpath);
									try {
									  fse.copySync(envPath + '/' + copyname + '/js', _path +'/'+ copyname +'/js')
									  console.log("success!")
									} catch (err) {
									  console.error(err)
									}
								});
								var nextModAry = [nextMod];
								console.log(nextModAry)
								loopFun(nextModAry);
							} else {
								// 不存在
							}
						});
					}
						
				});
			};

			loopFun(paths);
		},

		/**
		 * 输出u.js
		 */
		dist: function(){
			var adapterPath = envPath + "/kero-adapter";
			var command = `cd ${adapterPath} && npm run product`;
			exec(command, (error, stdout, stderr) => {
		      if (error) {
		        console.log(error)
		        process.exit()
		      }
		      console.log(chalk.green('\n √ 已生成测试用u.js'))
		      process.exit()
		    })
		}
	};

	buildFun.init();
};