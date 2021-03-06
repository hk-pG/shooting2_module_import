import { Enemy } from '../../../classes/Enemy';
import { player } from '../../../init/variables';
import { enemyBullet } from '../enemyBullet';

const lvl2 = (object: Enemy) => {
	if (!object.flag) {
		if (player.x > object.x && object.vx < 300) {
			object.accelerationX(30);
		} else if (object.vx > -600) {
			object.accelerationX(-30);
		}
	} else {
		if (player.x < object.x && object.vx < 300) {
			object.accelerationY(30);
		} else if (object.vx > -600) {
			object.accelerationY(50);
		}
	}

	if (!object.flag) {
		// forループの数だけ弾を発射する
		for (let i = 0; i < 8; i++) {
			// 球のスピード、プレイヤーを狙う弾（自機狙い）を0とした時の弾の広がる範囲
			enemyBullet(object, 850, -16, 16);
		}
		object.flag = true;
	}

	const ptn = [33, 34, 33, 35];
	object.snum = ptn[(object.count >> 3) & 3];
};

export { lvl2 };
