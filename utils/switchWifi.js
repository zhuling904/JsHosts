// 切换wifi
const { exec } = require('child_process');

// 关闭Wi-Fi
function disableWiFi() {
  // 根据操作系统选择适当的命令
  const command = process.platform === 'win32'
    ? 'netsh interface set interface "Wi-Fi" admin=disable'
    : process.platform === 'darwin'
      ? 'networksetup -setairportpower en0 off'
      : 'sudo ifconfig wlan0 down';

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`关闭Wi-Fi时出现错误： ${error.message}`);
      return;
    }
  });
}

// 打开 Wi-Fi
function enableWiFi() {
  // 根据操作系统选择适当的命令
  const command = process.platform === 'win32'
    ? 'netsh interface set interface "Wi-Fi" admin=enable'
    : process.platform === 'darwin'
      ? 'networksetup -setairportpower en0 on'
      : 'sudo ifconfig wlan0 up';

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`打开 Wi-Fi 时出现错误： ${error.message}`);
      return;
    }
  });
}

function switchWifi() {
    disableWiFi();
    enableWiFi();
    console.log('切换wifi成功')
}

exports.switchWifi = switchWifi;