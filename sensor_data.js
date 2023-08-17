const SerialPort = require('serialport');

// Add your USB port name
const port = new SerialPort('COM6 (Arduino Uno)', {
	parser: SerialPort.parsers.readline('\n')
});

port.on('open', function () {
	console.log('Opened port...');
});

