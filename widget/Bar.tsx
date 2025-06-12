import { App, Astal, Gtk, Gdk, Audio } from "astal/gtk4"
import { Variable } from "astal"
import Slider from "./components/Slider"

const time = Variable("").poll(10000, "date '+%d/%m %R'")

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
    const percentage = new Variable(
        () => `${Math.round((speaker?.volume ?? 0) * 100)}%`
    );

    return <window
        visible
        cssClasses={["Bar"]}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}>
        <centerbox cssName="centerbox">
            <box/>
            <box halign={Gtk.Align.END}>
                <menubutton>
                    <Gtk.Image iconName={"system-search"}/>
                    <popover autohide={false} hasArrow={false} cssClasses={["control-popup"]} position={Gtk.PositionType.BOTTOM}>
                        <box
                            halign={Gtk.Align.END}
                            vertical
                        >
                                <label halign={Gtk.Align.START}label={"Control Center"}/>
                            <box >
                                <Slider title={"Brightness"} icon={"display-brightness"}/>
                                <Slider title={"Volume"} icon={"audio-volume-high"}/>
                            </box>
                            <box cssClasses={["button-group"]}>
                                <button
                                    cssClasses={["menu-toggle", "active"]}
                                    onClicked="echo hi"
                                >
                                    <Gtk.Image cssClasses={["icon"]} pixelSize={24} iconName={"network-wireless"}/>
                                </button>
                                <button
                                    cssClasses={["menu-toggle"]}
                                    onClicked="echo hi"
                                >
                                    <Gtk.Image cssClasses={["icon"]} pixelSize={24} iconName={"bluetooth-active"} />
                                </button>
                            </box>
                        </box>
                    </popover>
                </menubutton>
                <menubutton
                    hexpand
                >
                    <label label={time()} />
                    <popover
                        hasArrow={false}
                        cssClasses={["calendar-popup"]}
                    >
                        <Gtk.Calendar />
                    </popover>
                </menubutton>
            </box>
        </centerbox>
    </window>
}
