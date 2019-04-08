define(['mui','comfot'], (mui, comfot) => {
	const user = document.querySelector('.user');
	const tel = document.querySelector('.tel');
	const address = document.querySelector('.address');
	const add = document.querySelector('.add');
	const title = document.querySelector('.title');
	const back = document.querySelector('.header>i');
	let _id = null;
	

	function init() {
		mui.init();
		back.addEventListener('tap', () => {
			location.href = `../index.html`
		})
		if(!location.search) {
			return addEvent();
		}
		_id = comfot.comfotUrl()._id;
		update();
	}

	function addEvent() {
		title.innerHTML = '新增地址';
		 add.addEventListener('tap', () => {
			let userVal = user.value.trim();
			let telVal = tel.value.trim();
			let addressVal = address.value.trim();
			if (!userVal || !telVal || !addressVal) {
				return alert('信息内容不能为空')
			}
			mui.ajax('/api/adddata', {
				type: 'post',
				data: {
					name: userVal,
					tel: telVal,
					add: addressVal
				},
				success: rs => {
					if (rs.code) {
					location.href = `../index.html`
					}
				}
			})
		})
			
	}
	function update() {
		//编辑
		mui.ajax('/api/finddata', {
			data: {
				_id: _id
			},
			success: val => {
				if(val.code) {
					title.innerHTML = '编辑地址';
					const data = val.data;
					console.log(data[0])
					 user.value = data[0].name;
					 tel.value = data[0].tel;
					 address.value = data[0].add;
				}
			}
		})
		 add.addEventListener('tap', () => {
			let userVal = user.value.trim();
			let telVal = tel.value.trim();
			let addressVal = address.value.trim();
			if (!userVal || !telVal || !addressVal) {
				return alert('信息内容不能为空')
			}
			mui.ajax('/api/updata', {
				type: 'post',
				data: {
					name: userVal,
					tel: telVal,
					add: addressVal
				},
				success: rs => {
					if (rs.code) {
					location.href = `../index.html`
					}
				}
			})
		})
	}
	init();
})
