import path from 'node:path'
import fs from 'node:fs'

// 定义源文件和目标文件的路径
const sourcePath = path.resolve(__dirname, '../packages/package.json') // 修改为实际的源文件路径
const destinationPath = path.resolve(__dirname, '../output-lib/package.json') // 修改为实际的目标文件路径

// 检查源文件是否存在
if (!fs.existsSync(sourcePath)) {
  console.error(`Source file ${sourcePath} does not exist.`)
  process.exit(1)
}

// 读取源文件内容
fs.readFile(sourcePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading source file: ${err}`)
    process.exit(1)
  }

  // 写入目标文件
  fs.writeFile(destinationPath, data, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing destination file: ${err}`)
      process.exit(1)
    }
  })
})
