import { Game } from 'phaser';
import {
  useEffect, FC
} from 'react';
import MainScene from '../../phaser/main-scene';
import PreloadScene from '../../phaser/preload-scene';
import Phaser from 'phaser';
import {
  Box, Text
} from '@chakra-ui/react';
import { useStore } from '../../stores';
import { observer } from 'mobx-react';
import {
  AnimationEnum, StageEnum
} from '../stage/stage.types';

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 720,
    height: 1280
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  pixelArt: true
};

export const PhaserGame: FC = observer(() => {
  const {
    gameStore, stageStore
  } = useStore();

  useEffect(() => {
    const game = new Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  useEffect(() => {
    if (gameStore.score === 10) {
      stageStore.setAnimation(AnimationEnum.UNSTUCK);
      stageStore.setCurrentStage(StageEnum.CHIMNEY);
    }
    if (gameStore.gameOver) {
      stageStore.setAnimation(AnimationEnum.STUCK);
      stageStore.setCurrentStage(StageEnum.CHIMNEY);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStore.score, gameStore.gameOver]);

  return (
    <>
      <Text
        color={'#444'}
        position={'absolute'}
        right={'0.6em'}
        top={'0.6em'}
        fontSize={'1.6em'}
      >
        SCORE
        <span
          style={{ color: 'red' }}
        >
          {` ${gameStore.score}`}
        </span>
      </Text>
      <Box id="phaser-game"></Box>
    </>
  );
});
