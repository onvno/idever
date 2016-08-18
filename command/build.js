const fs = require('fs');
const envPath = process.cwd();
const exec = require('child_process').exec;
const chalk = require('chalk');
const frameDir = [
	'sparrow',
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
			} else {
				console.error('请在此目录下，完成%s仓库内容下载',frameDir);
			}
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
		copy: function(){
			
		}
		

	};

	buildFun.init();
};