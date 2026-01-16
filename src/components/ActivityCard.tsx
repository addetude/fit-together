import { MapPin, Calendar, Users } from 'lucide-react';
import { ActivityRequest, LEVEL_LABELS } from '@/types/fitness';
import { getLevelColor } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ActivityCardProps {
  activity: ActivityRequest;
  onJoin: (activityId: string) => void;
}

export const ActivityCard = ({ activity, onJoin }: ActivityCardProps) => {
  return (
    <Card variant="elevated" className="overflow-hidden">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <img
              src={activity.user.avatar}
              alt={activity.user.name}
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-base">{activity.activity}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{activity.user.name}</span>
                <span>•</span>
                <span className={cn(
                  "px-1.5 py-0.5 rounded text-xs font-medium",
                  getLevelColor(activity.user.level)
                )}>
                  {LEVEL_LABELS[activity.user.level]}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>

          {/* Details */}
          <div className="flex flex-wrap gap-3 mb-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin size={14} />
              <span>{activity.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar size={14} />
              <span>{format(activity.dateTime, 'EEE, MMM d • h:mm a')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users size={14} />
              <span>{activity.spotsAvailable} spot{activity.spotsAvailable !== 1 ? 's' : ''} left</span>
            </div>
          </div>

          {/* Action */}
          <Button
            variant="soft"
            className="w-full"
            onClick={() => onJoin(activity.id)}
          >
            Request to Join
          </Button>
        </CardContent>
      </Card>
  );
};
