'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Check, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  BehaviorIndicator,
  getScoreIcon,
  getCategoryBehaviorIndicator 
} from '../constants/behavior-indicators';

interface BehaviorIndicatorCardProps {
  indicator: BehaviorIndicator;
  category: string;
  isSelected: boolean;
  onSelect: (score: number) => void;
  index: number;
}

const BehaviorIndicatorCard: React.FC<BehaviorIndicatorCardProps> = ({
  indicator,
  category,
  isSelected,
  onSelect,
  index
}) => {
  const categoryIndicator = getCategoryBehaviorIndicator(category as any, indicator.score);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        cursor-pointer border-2 rounded-xl transition-all duration-300 group
        ${isSelected 
          ? `${indicator.bgColor} border-current ring-2 ring-offset-2 ring-blue-500 shadow-lg` 
          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
        }
      `}
      onClick={() => onSelect(indicator.score)}
    >
      <div className="flex items-center p-5">
        {/* 점수 (왼쪽) - 강조된 디자인 */}
        <div className="flex-shrink-0 mr-5">
          <div className={`
            w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold text-xl
            transition-all duration-300 border-3
            ${isSelected 
              ? `${indicator.color} ${indicator.bgColor} border-current shadow-md` 
              : 'text-gray-600 bg-gray-50 border-gray-300 group-hover:bg-gray-100'
            }
          `}>
            <div className="text-2xl">{indicator.score}</div>
            <div className="text-xs mt-1 opacity-75">점</div>
          </div>
        </div>

        {/* 행동지표 내용 (중앙) */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-3">{getScoreIcon(indicator.score)}</span>
            <div className="flex flex-col">
              <span className={`font-bold text-lg ${isSelected ? indicator.color : 'text-gray-800'}`}>
                {indicator.label}
              </span>
              <Badge 
                variant="outline" 
                className={`
                  mt-1 self-start text-sm font-medium
                  ${isSelected ? `${indicator.color} border-current` : 'text-gray-600 border-gray-300'}
                `}
              >
                🎯 {categoryIndicator?.keyword || indicator.keyword}
              </Badge>
            </div>
          </div>
          
          <p className={`
            text-sm leading-relaxed
            ${isSelected ? indicator.color : 'text-gray-600'}
          `}>
            {categoryIndicator?.description || indicator.description}
          </p>
        </div>

        {/* 선택 표시 및 상태 (오른쪽) */}
        <div className="flex-shrink-0 ml-5 flex flex-col items-center">
          {isSelected ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${indicator.bgColor} ${indicator.color} border-2 border-current
              `}
            >
              <Check className="w-5 h-5" />
            </motion.div>
          ) : (
            <div className="w-8 h-8 rounded-full border-2 border-gray-300 group-hover:border-gray-400 transition-colors" />
          )}
          
          {/* 점수 레벨 표시 */}
          <div className="mt-2 text-center">
            <div className={`
              text-xs font-medium px-2 py-1 rounded-full
              ${isSelected 
                ? `${indicator.bgColor} ${indicator.color}` 
                : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
              }
            `}>
              {indicator.score === 5 && '최고'}
              {indicator.score === 4 && '우수'}  
              {indicator.score === 3 && '보통'}
              {indicator.score === 2 && '미흡'}
              {indicator.score === 1 && '부족'}
            </div>
          </div>
        </div>
      </div>

      {/* 선택 시 추가 정보 */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`border-t-2 border-dashed ${indicator.color.replace('text-', 'border-')} px-5 py-3`}
        >
          <div className="flex items-center text-sm">
            <TrendingUp className={`w-4 h-4 mr-2 ${indicator.color}`} />
            <span className={`font-medium ${indicator.color}`}>
              선택된 평가: {indicator.score}점 → {categoryIndicator?.keyword || indicator.keyword}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BehaviorIndicatorCard;
