const expect = require('expect.js');
const statistic = require('../');

describe('#base', () => {
	it('#sync', async () => {
		const data = await statistic(() => {});
		expect(data.inRun.length).to.be(0);
		expect(data.outRun.length).to.be(0);
	});

	describe('#async', () => {
		it('#empty', async () => {
			const data = await statistic(async () => {});
			expect(data.inRun.length).to.be(2);
			expect(data.outRun.length).to.be(3);
		});

		it('#promise', async () => {
			const data = await statistic(() => {
				return new Promise(resolve => setTimeout(resolve, 20));
			});
			// console.log(data);
			expect(data.inRun.length).to.be(4);
			expect(data.outRun.length).to.be(3);
		});

		it('#outRun')
	});
});
