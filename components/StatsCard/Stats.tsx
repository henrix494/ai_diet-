import { Authenticated } from "convex/react";

interface StatsProps {
  GetUser: () => JSX.Element;

  RecipeCount: () => JSX.Element;

  FavCount: () => JSX.Element;

  GetCount: () => JSX.Element;

  stats: {
    title: string;
    icon?: JSX.Element | null;
    component: JSX.Element;
    className?: string;
  }[];
}

const StatItem = ({
  children,
  title,
  icon,
  className = "",
}: {
  children: JSX.Element;
  title: string;
  icon?: JSX.Element;
  className?: string;
}) => (
  <div className={`stat ${className} flex justify-around items-center`}>
    <div>
      <Authenticated>{children}</Authenticated>
      <div className="stat-title text-secondary">{title}</div>
    </div>
    {icon && <div className="stat-figure text-primary">{icon}</div>}
  </div>
);

export default function Stats({ GetUser, stats }: StatsProps) {
  return (
    <div className="stats shadow w-[99vw] max-lg:mt-2 relative z-0">
      <div className="flex items-center justify-around">
        <div className="text-secondary">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <Authenticated>
                <GetUser />
              </Authenticated>
            </div>
          </div>
        </div>
      </div>
      {stats?.map((stat, index) => (
        <StatItem
          key={index}
          title={stat.title}
          icon={stat.icon || undefined}
          className={stat.className}
        >
          {stat.component}
        </StatItem>
      ))}
    </div>
  );
}
