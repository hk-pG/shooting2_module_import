import { makeEnemy } from '../../classes/instance/makeEnemy';
import { enemy, item, vars } from '../../init/variables';
import { DEBUG, oneWave, tenSeconds } from '../../main';
import { makeItem } from '../itemFunctions/makeItem';
import { rand } from '../random';
import { increaseWave } from './increaseWave';
import { levelUp } from './levelUp';

const lvl1Waves: Function[] = [
	// 0
	(): void => {
		// ピンクのヒヨコのみを出す
		if (!rand(0, 30)) {
			enemy.push(makeEnemy(0, []));
		}
		// 3０秒経過したらウェーブを１段階上げる
		increaseWave(oneWave);
	},

	// 1
	(): void => {
		//  黄色のヒヨコのみを出す
		if (!rand(0, 30)) {
			enemy.push(makeEnemy(1, []));
		}
		// ２０秒経過したらウェーブを１段階上げる
		increaseWave(oneWave);
	},

	// 2
	(): void => {
		//  黄色とピンクのヒヨコをランダムで出す
		if (rand(0, 20) === 1) {
			enemy.push(makeEnemy(rand(0, 1), []));
		}
		if (
			!rand(0, 99) &&
			vars.healCount == 2 &&
			vars.gameCount > tenSeconds * 20
		) {
			//  20秒経過したら回復アイテムを出す
			item.push(makeItem(0, 0, 400));
			vars.healCount = 1;
		}
		// 30秒経過したらウェーブを１段階上げる
		increaseWave(oneWave);
	},

	// 3
	(): void => {
		//  ボスキャラ出現
		if (vars.gameCount === tenSeconds * 5) {
			enemy.push(makeEnemy(2, [, , , 200]));
			vars.bossEncounter = true;
		} else if (
			vars.gameCount >= tenSeconds * 90 &&
			vars.healCount == 1 &&
			!rand(0, 99)
		) {
			item.push(makeItem(0));
			vars.healCount--;
		}

		// 敵がいなくなったらループ or ゲームクリア
		if (enemy.length === 0 && vars.gameCount > tenSeconds * 6) {
			//  8秒程度経過 && 最終ラウンドまでクリアしたらゲームクリアを表示する
			levelUp();
			return;
		}
	},
];

export { lvl1Waves };
