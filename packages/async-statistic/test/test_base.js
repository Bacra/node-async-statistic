const expect = require('expect.js');
const statistic = require('../');

describe('#base', () => {
	it('#sync', async () => {
		const data = await statistic(() => {});

		// console.log(data);
		expect(data.inRun.length).to.be(0);
		expect(data.outRun.length).to.be(0);
	});

	describe('#async', () => {
		it('#empty', async () => {
			const data = await statistic(async () => {});

			// console.log(data);
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

		it('#outRun', async () => {
			const promise1 = new Promise(resolve => setTimeout(resolve, 200));
			const promise2 = new Promise(resolve => setTimeout(resolve, 100))
				.then(() => {
					return new Promise(resolve => setTimeout(resolve, 10));
				});

			const dataPromise = statistic(() => {
				return new Promise(resolve => setTimeout(resolve, 150));
			});

			const promise3 = new Promise(resolve => setTimeout(resolve, 200));
			const promise4 = new Promise(resolve => setTimeout(resolve, 100))
				.then(() => {
					return new Promise(resolve => setTimeout(resolve, 10));
				});


			const [,, data] = await Promise.all([
				promise1,
				promise2,
				dataPromise,
				promise3,
				promise4,
			]);

			// console.log(data);
			expect(data.inRun.length).to.be(4);
			expect(data.outRun.length).to.be(10);
		});
	});

	describe('#options', () => {
		it('#stack', async () => {
			const data = await statistic(async () => {}, { stack: true });

			// console.log(data, data.inRun[0].stack);
			expect(data.inRun[0].stack).to.be.an('array');
		});
	});
});
